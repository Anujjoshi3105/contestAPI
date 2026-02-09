import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Configuration for Retry and Circuit Breaker
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // ms
const FAILURE_THRESHOLD = 5;
const RESET_TIMEOUT = 30000; // 30 seconds
const RATE_LIMIT_DELAY = 100; // 100ms minimum between requests per host

interface CustomConfig extends InternalAxiosRequestConfig {
    _retryCount?: number;
}

// Circuit Breaker & Rate Limit State
const circuitStates: Record<string, {
    status: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
    failures: number;
    lastFailure?: number;
    lastRequest?: number;
}> = {};

function getHost(url?: string): string {
    if (!url) return 'unknown';
    try {
        return new URL(url).hostname;
    } catch {
        return url;
    }
}

export const httpClient: AxiosInstance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Circuit Breaker & Rate Limit Check
httpClient.interceptors.request.use(
    async (config) => {
        const host = getHost(config.url);

        if (!circuitStates[host]) {
            circuitStates[host] = { status: 'CLOSED', failures: 0 };
        }

        const state = circuitStates[host];

        // Circuit Breaker Check
        if (state.status === 'OPEN') {
            const now = Date.now();
            if (now - (state.lastFailure || 0) > RESET_TIMEOUT) {
                state.status = 'HALF_OPEN';
            } else {
                throw new Error(`Circuit breaker is OPEN for ${host}`);
            }
        }

        // Rate Limit Check (Simple Delay)
        const now = Date.now();
        if (state.lastRequest && (now - state.lastRequest < RATE_LIMIT_DELAY)) {
            const waitTime = RATE_LIMIT_DELAY - (now - state.lastRequest);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        state.lastRequest = Date.now();

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Retry Logic and Circuit Breaker Tracking
httpClient.interceptors.response.use(
    (response) => {
        const host = getHost(response.config.url);
        if (circuitStates[host]) {
            circuitStates[host].failures = 0;
            circuitStates[host].status = 'CLOSED';
        }
        return response;
    },
    async (error) => {
        const config = error.config as CustomConfig;
        const host = getHost(config?.url);

        if (!circuitStates[host]) {
            circuitStates[host] = { status: 'CLOSED', failures: 0 };
        }

        const state = circuitStates[host];

        // Track failures for Circuit Breaker
        state.failures += 1;
        state.lastFailure = Date.now();

        if (state.failures >= FAILURE_THRESHOLD) {
            state.status = 'OPEN';
        }

        // Retry Logic for 503 or Network Errors
        if (config && (error.response?.status === 503 || !error.response)) {
            config._retryCount = config._retryCount || 0;

            if (config._retryCount < MAX_RETRIES) {
                config._retryCount += 1;
                const delay = RETRY_DELAY * config._retryCount;

                // Exponential backoff
                await new Promise((resolve) => setTimeout(resolve, delay));
                return httpClient(config);
            }
        }

        // Simplified error messages
        if (error.response?.status === 503) {
            error.message = 'Service temporarily unavailable';
        } else if (error.code === 'ECONNABORTED') {
            error.message = 'Request timed out';
        }

        return Promise.reject(error);
    }
);
