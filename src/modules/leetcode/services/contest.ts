import * as provider from '../provider';
import * as formatters from '../utils/formatters';
import {
    ContestRankingResponse,
    ContestHistogramResponse,
    Contest,
} from '../types';

export async function getContestRankingInfo(username: string): Promise<ContestRankingResponse> {
    try {
        const data = await provider.fetchUserContestRanking(username);
        return formatters.formatContestRanking(data);
    } catch (error: any) {
        console.error(`LeetCode Error for ${username}:`, error.message);
        throw new Error('Error fetching LeetCode contest ranking info');
    }
}

export async function getContestHistogram(): Promise<ContestHistogramResponse> {
    try {
        return await provider.fetchContestHistogram();
    } catch (error: any) {
        console.error('LeetCode Histogram Error:', error.message);
        throw new Error('Error fetching LeetCode contest histogram');
    }
}

export async function getAllContests(): Promise<Contest[]> {
    try {
        return await provider.fetchAllContests();
    } catch (error: any) {
        console.error('LeetCode Contests Error:', error.message);
        throw new Error('Error fetching LeetCode contests');
    }
}

export async function getUpcomingContests(): Promise<Contest[]> {
    try {
        const contests = await provider.fetchAllContests();
        const now = Math.floor(Date.now() / 1000);
        return contests.filter(c => c.startTime > now);
    } catch (error: any) {
        throw new Error('Error fetching upcoming LeetCode contests');
    }
}
