import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Registers all MCP prompts.
 *
 * @param mcp - The MCP Server instance to register prompts with
 */
export function registerAllPrompts(mcp: McpServer): void {
    // Contest performance summary prompt
    mcp.prompt(
        "contest-summary",
        "Request a professional summary of a user's competitive programming performance across platforms",
        { username: z.string().describe("The username to analyze") },
        async ({ username }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Analyze the contest ratings for "${username}" across multiple platforms (LeetCode, Codeforces, AtCoder, CodeChef, GeeksforGeeks) and provide a professional summary of their competitive programming strengths, rating progression, and standing.`
                    }
                }
            ]
        })
    );

    // Comparison prompt
    mcp.prompt(
        "compare-users",
        "Request a comparison between two competitive programmers across platforms",
        {
            user1: z.string().describe("First username to compare"),
            user2: z.string().describe("Second username to compare")
        },
        async ({ user1, user2 }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Compare the competitive programming profiles of "${user1}" and "${user2}". Analyze their ratings, contest participation, problem-solving statistics, and strengths across available platforms.`
                    }
                }
            ]
        })
    );

    // Improvement suggestions prompt
    mcp.prompt(
        "improvement-tips",
        "Request personalized improvement suggestions based on a user's competitive programming profile",
        { username: z.string().describe("The username to analyze for improvement tips") },
        async ({ username }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Based on the competitive programming profile of "${username}", analyze their problem-solving patterns, rating trends, and skill distribution. Provide actionable improvement suggestions to help them advance to the next level.`
                    }
                }
            ]
        })
    );
}
