import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import config from "./config/env";

import { leetcodePlugin } from "./modules/leetcode";
import { codeforcesPlugin } from "./modules/codeforces";
import { codechefPlugin } from "./modules/codechef";
import { atcoderPlugin } from "./modules/atcoder";
import { gfgPlugin } from "./modules/gfg";
import { ratingsPlugin } from "./modules/ratings";
import { mcpPlugin } from "./modules/mcp";

export async function buildApp() {
    const fastify = Fastify({
        logger: true,
    });

    fastify.setErrorHandler((error: any, request, reply) => {
        fastify.log.error(error);
        const statusCode = error.statusCode || 500;
        reply.status(statusCode).send({
            success: false,
            error: error.name || 'InternalServerError',
            message: error.message || 'An unexpected error occurred',
        });
    });

    await fastify.register(cors, {
        exposedHeaders: ['WWW-Authenticate', 'Mcp-Session-Id', 'Last-Event-Id', 'Mcp-Protocol-Version'],
        origin: '*',
    });

    await fastify.register(swagger, {
        openapi: {
            info: {
                title: "Vortex",
                description: "A high-performance modular API to fetch competitive programming contest ratings and user statistics from platforms like LeetCode, Codeforces, CodeChef, and more. Built with Fastify and TypeScript.",
                version: "1.0.0",
                contact: {
                    name: "GitHub",
                    url: "https://github.com/Anujjoshi3105/vortex",
                },
                license: {
                    name: "ISC",
                    url: "https://opensource.org/licenses/ISC",
                },
            },
            servers: [
                {
                    url: `http://localhost:${config.port}`,
                    description: 'Development server',
                },
            ],
            tags: [
                { name: 'Default', description: 'General server health and infrastructure endpoints' },
                { name: 'MCP', description: 'Model Context Protocol endpoints for AI agent integration' },
                { name: 'Ratings', description: 'Cross-platform rating aggregation and comparison' },
                { name: 'LeetCode - User', description: 'Fetch user profiles, badges, solved statistics, and submission history' },
                { name: 'LeetCode - Contests', description: 'Access contest rankings, history, and upcoming competition data' },
                { name: 'LeetCode - Problems', description: 'Retrieve daily challenges, problem details, and official solutions' },
                { name: 'LeetCode - Discussion', description: 'Explore trending topics and community comments' },
                { name: 'Codeforces - User', description: 'Fetch user profiles, ratings, contest history, and blogs' },
                { name: 'Codeforces - Contests', description: 'Access contest standings, hacks, and rating changes' },
                { name: 'Codeforces - Problems', description: 'Retrieve problemset and recent platform submissions' },
                { name: 'Codeforces - Blog', description: 'Explore blog entries and community comments' },
                { name: 'CodeChef', description: 'CodeChef platform integration' },
                { name: 'AtCoder', description: 'AtCoder platform integration' },
                { name: 'GFG', description: 'GeeksforGeeks platform integration for user profiles, submissions, posts, and contest leaderboards' },
            ],
        },
    });

    await fastify.register(swaggerUi, {
        routePrefix: "/docs",
        uiConfig: {
            docExpansion: 'list',
            deepLinking: true,
            filter: true,
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
    });

    fastify.get("/health", { schema: { tags: ['Default'] } }, async (request: FastifyRequest, reply: FastifyReply) => {
        return { status: "ok" };
    });
    await fastify.register(mcpPlugin);
    await fastify.register(ratingsPlugin, { prefix: "/api/v1/ratings" });
    await fastify.register(leetcodePlugin, { prefix: "/api/v1/leetcode" });
    await fastify.register(codeforcesPlugin, { prefix: "/api/v1/codeforces" });
    await fastify.register(codechefPlugin, { prefix: "/api/v1/codechef" });
    await fastify.register(atcoderPlugin, { prefix: "/api/v1/atcoder" });
    await fastify.register(gfgPlugin, { prefix: "/api/v1/gfg" });


    return fastify;
}
