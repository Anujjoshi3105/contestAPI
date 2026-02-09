import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { safeToolHandler } from "./base";
import * as service from "../../atcoder/service";

/**
 * Registers all AtCoder-related MCP tools.
 */
export function register(mcp: McpServer): void {
    // Get user rating
    mcp.tool(
        "atcoder_get_rating",
        "Fetches an AtCoder user's rating, rank, max rating, country, birth year, avatar, and complete rating history.",
        { username: z.string().describe("The AtCoder username") },
        safeToolHandler(({ username }) => service.getUserRating(username))
    );

    // Get user contest history
    mcp.tool(
        "atcoder_get_history",
        "Fetches the complete contest participation history for an AtCoder user with performance and rating changes.",
        { username: z.string().describe("The AtCoder username") },
        safeToolHandler(({ username }) => service.getUserHistory(username))
    );

    // Get contest standings
    mcp.tool(
        "atcoder_get_contest_standings",
        "Fetches the standings/leaderboard for a specific AtCoder contest showing all participants' scores and rankings.",
        {
            contestId: z.string().describe("The AtCoder contest ID (e.g., 'abc300')"),
            extended: z.boolean().optional().default(false).describe("Include extended statistics (default: false)")
        },
        safeToolHandler(({ contestId, extended }) => service.getContestStandings(contestId, extended))
    );

    // Get contest results
    mcp.tool(
        "atcoder_get_contest_results",
        "Fetches the final results and rating changes for all participants in a specific AtCoder contest.",
        { contestId: z.string().describe("The AtCoder contest ID (e.g., 'abc300')") },
        safeToolHandler(({ contestId }) => service.getContestResults(contestId))
    );

    // Get virtual standings
    mcp.tool(
        "atcoder_get_virtual_standings",
        "Fetches the virtual contest standings for an AtCoder contest, showing ghost participants.",
        {
            contestId: z.string().describe("The AtCoder contest ID (e.g., 'abc300')"),
            showGhost: z.boolean().optional().default(true).describe("Include ghost participants (default: true)")
        },
        safeToolHandler(({ contestId, showGhost }) => service.getVirtualStandings(contestId, showGhost))
    );
}
