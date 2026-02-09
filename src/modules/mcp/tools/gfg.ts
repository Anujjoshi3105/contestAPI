import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { safeToolHandler } from "./base";
import * as service from "../../gfg/service";

/**
 * Registers all GeeksforGeeks (GFG)-related MCP tools.
 */
export function register(mcp: McpServer): void {
    // Get user rating
    mcp.tool(
        "gfg_get_rating",
        "Fetches a GeeksforGeeks user's coding score/rating and star level.",
        { username: z.string().describe("The GFG username/handle") },
        safeToolHandler(({ username }) => service.getUserRating(username))
    );

    // Get user submissions
    mcp.tool(
        "gfg_get_submissions",
        "Fetches problem submissions for a GeeksforGeeks user with optional time-based filtering.",
        {
            handle: z.string().describe("The GFG username/handle"),
            requestType: z.string().optional().describe("Type of request filter"),
            year: z.string().optional().describe("Filter by year (e.g., '2024')"),
            month: z.string().optional().describe("Filter by month (e.g., '01' for January)")
        },
        safeToolHandler(({ handle, requestType, year, month }) =>
            service.getUserSubmissions({ handle, requestType, year, month })
        )
    );

    // Get user posts
    mcp.tool(
        "gfg_get_posts",
        "Fetches articles and posts authored by a GeeksforGeeks user.",
        {
            username: z.string().describe("The GFG username"),
            fetch_type: z.string().optional().describe("Type of posts to fetch"),
            page: z.number().optional().describe("Page number for pagination")
        },
        safeToolHandler(({ username, fetch_type, page }) =>
            service.getUserPosts({ username, fetch_type, page })
        )
    );

    // Get promotional events
    mcp.tool(
        "gfg_get_promotional_events",
        "Fetches current and upcoming promotional events/contests on GeeksforGeeks.",
        {
            page_source: z.string().describe("The page source identifier"),
            user_country_code: z.string().optional().describe("User's country code for localized events")
        },
        safeToolHandler(({ page_source, user_country_code }) =>
            service.getPromotionalEvents({ page_source, user_country_code })
        )
    );

    // Get contest leaderboard
    mcp.tool(
        "gfg_get_contest_leaderboard",
        "Fetches the leaderboard for GeeksforGeeks coding contests.",
        {
            leaderboard_type: z.number().optional().describe("Type of leaderboard (numeric)"),
            page: z.number().optional().describe("Page number for pagination"),
            year_month: z.string().optional().describe("Filter by year and month (e.g., '2024-01')")
        },
        safeToolHandler(({ leaderboard_type, page, year_month }) =>
            service.getContestLeaderboard({ leaderboard_type, page, year_month })
        )
    );
}
