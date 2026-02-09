import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { safeToolHandler } from "./base";
import * as service from "../../codeforces/service";

/**
 * Registers all Codeforces-related MCP tools.
 */
export function register(mcp: McpServer): void {
    // Get user rating
    mcp.tool(
        "codeforces_get_rating",
        "Fetches a Codeforces user's current rating, rank, max rating, contribution score, and avatar URL.",
        { username: z.string().describe("The Codeforces handle (username)") },
        safeToolHandler(({ username }) => service.getUserRating(username))
    );

    // Get contest history
    mcp.tool(
        "codeforces_get_contest_history",
        "Fetches the complete contest participation history for a Codeforces user, including rating changes after each contest.",
        { username: z.string().describe("The Codeforces handle (username)") },
        safeToolHandler(({ username }) => service.getContestHistory(username))
    );

    // Get user status (submissions)
    mcp.tool(
        "codeforces_get_user_status",
        "Fetches recent submissions for a Codeforces user with verdict, problem info, and submission details.",
        {
            username: z.string().describe("The Codeforces handle (username)"),
            from: z.number().optional().default(1).describe("1-based index of the first submission to return (default: 1)"),
            count: z.number().optional().default(10).describe("Number of submissions to return (default: 10)")
        },
        safeToolHandler(({ username, from, count }) => service.getUserStatus(username, from, count))
    );

    // Get user blog entries
    mcp.tool(
        "codeforces_get_user_blogs",
        "Fetches all blog entries authored by a Codeforces user, including titles, ratings, and creation times.",
        { username: z.string().describe("The Codeforces handle (username)") },
        safeToolHandler(({ username }) => service.getUserBlogs(username))
    );

    // Get solved problems
    mcp.tool(
        "codeforces_get_solved_problems",
        "Fetches all problems solved by a Codeforces user, including problem ratings, tags, and direct links.",
        { username: z.string().describe("The Codeforces handle (username)") },
        safeToolHandler(({ username }) => service.getSolvedProblems(username))
    );

    // Get contests list
    mcp.tool(
        "codeforces_get_contests",
        "Fetches the list of all Codeforces contests (past and upcoming), optionally including gym contests.",
        { gym: z.boolean().optional().default(false).describe("If true, include gym contests (default: false)") },
        safeToolHandler(({ gym }) => service.getContests(gym))
    );

    // Get recent actions
    mcp.tool(
        "codeforces_get_recent_actions",
        "Fetches recent actions on Codeforces such as new blog entries and comments.",
        { maxCount: z.number().optional().default(20).describe("Maximum number of actions to return (default: 20, max: 100)") },
        safeToolHandler(({ maxCount }) => service.getRecentActions(maxCount))
    );

    // Get problemset problems
    mcp.tool(
        "codeforces_get_problems",
        "Fetches all problems from the Codeforces problemset, optionally filtered by tags.",
        { tags: z.string().optional().describe("Semicolon-separated tags to filter problems (e.g., 'dp;greedy')") },
        safeToolHandler(({ tags }) => service.getProblems(tags))
    );

    // Get contest standings
    mcp.tool(
        "codeforces_get_contest_standings",
        "Fetches the standings/leaderboard for a specific Codeforces contest with participant rankings and scores.",
        {
            contestId: z.number().describe("The numeric ID of the contest"),
            from: z.number().optional().describe("1-based index of the first standing row"),
            count: z.number().optional().describe("Number of standings rows to return"),
            handles: z.string().optional().describe("Semicolon-separated handles to filter the standings"),
            room: z.number().optional().describe("Room number to filter standings"),
            showUnofficial: z.boolean().optional().describe("Include unofficial participants")
        },
        safeToolHandler(({ contestId, from, count, handles, room, showUnofficial }) =>
            service.getContestStandings(contestId, from, count, handles, room, showUnofficial)
        )
    );

    // Get contest rating changes
    mcp.tool(
        "codeforces_get_contest_rating_changes",
        "Fetches the rating changes for all participants in a specific Codeforces contest.",
        { contestId: z.number().describe("The numeric ID of the contest") },
        safeToolHandler(({ contestId }) => service.getContestRatingChanges(contestId))
    );

    // Get contest hacks
    mcp.tool(
        "codeforces_get_contest_hacks",
        "Fetches all successful and unsuccessful hacks that occurred during a Codeforces contest.",
        { contestId: z.number().describe("The numeric ID of the contest") },
        safeToolHandler(({ contestId }) => service.getContestHacks(contestId))
    );

    // Get contest status (submissions)
    mcp.tool(
        "codeforces_get_contest_status",
        "Fetches submissions made in a specific Codeforces contest, optionally filtered by a handle.",
        {
            contestId: z.number().describe("The numeric ID of the contest"),
            handle: z.string().optional().describe("Optional handle to filter submissions"),
            from: z.number().optional().describe("1-based index of the first submission"),
            count: z.number().optional().describe("Number of submissions to return")
        },
        safeToolHandler(({ contestId, handle, from, count }) =>
            service.getContestStatus(contestId, handle, from, count)
        )
    );

    // Get problemset recent status
    mcp.tool(
        "codeforces_get_problemset_recent_status",
        "Fetches the most recent submissions across the entire Codeforces problemset.",
        { count: z.number().describe("Number of recent submissions to return (max: 1000)") },
        safeToolHandler(({ count }) => service.getProblemsetRecentStatus(count))
    );

    // Get blog entry
    mcp.tool(
        "codeforces_get_blog_entry",
        "Fetches the full content of a specific Codeforces blog entry by its ID.",
        { blogEntryId: z.number().describe("The numeric ID of the blog entry") },
        safeToolHandler(({ blogEntryId }) => service.getBlogEntry(blogEntryId))
    );

    // Get blog comments
    mcp.tool(
        "codeforces_get_blog_comments",
        "Fetches all comments on a specific Codeforces blog entry.",
        { blogEntryId: z.number().describe("The numeric ID of the blog entry") },
        safeToolHandler(({ blogEntryId }) => service.getBlogComments(blogEntryId))
    );
}
