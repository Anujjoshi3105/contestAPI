import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { safeToolHandler } from "./base";
import * as userService from "../../leetcode/services/user";
import * as contestService from "../../leetcode/services/contest";
import * as problemService from "../../leetcode/services/problem";
import * as discussionService from "../../leetcode/services/discussion";

export function register(mcp: McpServer): void {
    // ==================== USER TOOLS ====================

    // Get user contest rating
    mcp.tool(
        "leetcode_get_rating",
        "Fetches the LeetCode contest rating for a user, including their global ranking, attended contests count, and rating percentile.",
        { username: z.string().describe("The LeetCode username to look up") },
        safeToolHandler(({ username }) => userService.getUserRating(username))
    );

    // Get user profile
    mcp.tool(
        "leetcode_get_profile",
        "Fetches the complete LeetCode profile for a user, including basic info, company, school, skills, and social links.",
        { username: z.string().describe("The LeetCode username to look up") },
        safeToolHandler(({ username }) => userService.getUserProfile(username))
    );

    // Get user details
    mcp.tool(
        "leetcode_get_details",
        "Fetches detailed user information from LeetCode including profile data, submission stats, and problem solving summary.",
        { username: z.string().describe("The LeetCode username to look up") },
        safeToolHandler(({ username }) => userService.getUserDetails(username))
    );

    // Get user badges
    mcp.tool(
        "leetcode_get_badges",
        "Fetches all badges earned by a LeetCode user, including annual badges and special achievements.",
        { username: z.string().describe("The LeetCode username to look up") },
        safeToolHandler(({ username }) => userService.getUserBadges(username))
    );

    // Get user solved problems
    mcp.tool(
        "leetcode_get_solved",
        "Fetches the solved problems count for a LeetCode user, broken down by difficulty (Easy, Medium, Hard).",
        { username: z.string().describe("The LeetCode username to look up") },
        safeToolHandler(({ username }) => userService.getUserSolved(username))
    );

    // Get user contest ranking
    mcp.tool(
        "leetcode_get_contest_ranking",
        "Fetches detailed contest ranking information for a LeetCode user, including rating, ranking, and top percentage.",
        { username: z.string().describe("The LeetCode username to look up") },
        safeToolHandler(({ username }) => userService.getUserContest(username))
    );

    // Get user contest history
    mcp.tool(
        "leetcode_get_contest_history",
        "Fetches the complete contest participation history for a LeetCode user, including each contest's ranking and rating changes.",
        { username: z.string().describe("The LeetCode username to look up") },
        safeToolHandler(({ username }) => userService.getUserContestHistory(username))
    );

    // Get user submissions
    mcp.tool(
        "leetcode_get_submissions",
        "Fetches recent submissions for a LeetCode user, including problem title, status, language, and timestamp.",
        {
            username: z.string().describe("The LeetCode username to look up"),
            limit: z.number().optional().default(20).describe("Maximum number of submissions to return (default: 20)")
        },
        safeToolHandler(({ username, limit }) => userService.getUserSubmission(username, limit))
    );

    // Get user accepted submissions
    mcp.tool(
        "leetcode_get_ac_submissions",
        "Fetches recent accepted (AC) submissions for a LeetCode user, filtered to only show successful solutions.",
        {
            username: z.string().describe("The LeetCode username to look up"),
            limit: z.number().optional().default(20).describe("Maximum number of AC submissions to return (default: 20)")
        },
        safeToolHandler(({ username, limit }) => userService.getUserAcSubmission(username, limit))
    );

    // Get user calendar/activity
    mcp.tool(
        "leetcode_get_calendar",
        "Fetches the submission calendar/heatmap data for a LeetCode user for a specific year, showing daily activity.",
        {
            username: z.string().describe("The LeetCode username to look up"),
            year: z.number().describe("The year to fetch calendar data for (e.g., 2024)")
        },
        safeToolHandler(({ username, year }) => userService.getUserCalendar(username, year))
    );

    // Get user skill stats
    mcp.tool(
        "leetcode_get_skill_stats",
        "Fetches the skill/tag statistics for a LeetCode user, showing proficiency in different problem categories like DP, Graph, etc.",
        { username: z.string().describe("The LeetCode username to look up") },
        safeToolHandler(({ username }) => userService.getUserSkill(username))
    );

    // Get user language stats
    mcp.tool(
        "leetcode_get_languages",
        "Fetches the programming language statistics for a LeetCode user, showing problems solved per language.",
        { username: z.string().describe("The LeetCode username to look up") },
        safeToolHandler(({ username }) => userService.getUserLanguage(username))
    );

    // Get user progress
    mcp.tool(
        "leetcode_get_progress",
        "Fetches the overall problem-solving progress for a LeetCode user across all categories.",
        { username: z.string().describe("The LeetCode username to look up") },
        safeToolHandler(({ username }) => userService.getUserProgress(username))
    );

    // ==================== CONTEST TOOLS ====================

    // Get contest ranking info
    mcp.tool(
        "leetcode_get_contest_ranking_info",
        "Fetches detailed contest ranking information including rating, global rank, and percentile for a user.",
        { username: z.string().describe("The LeetCode username to look up") },
        safeToolHandler(({ username }) => contestService.getContestRankingInfo(username))
    );

    // Get contest histogram
    mcp.tool(
        "leetcode_get_contest_histogram",
        "Fetches the contest rating distribution histogram showing how many users are at each rating level.",
        {},
        safeToolHandler(() => contestService.getContestHistogram())
    );

    // Get all contests
    mcp.tool(
        "leetcode_get_all_contests",
        "Fetches a list of all LeetCode contests including past weekly and biweekly contests with their details.",
        {},
        safeToolHandler(() => contestService.getAllContests())
    );

    // Get upcoming contests
    mcp.tool(
        "leetcode_get_upcoming_contests",
        "Fetches a list of upcoming LeetCode contests that haven't started yet.",
        {},
        safeToolHandler(() => contestService.getUpcomingContests())
    );

    // ==================== PROBLEM TOOLS ====================

    // Get daily problem
    mcp.tool(
        "leetcode_get_daily_problem",
        "Fetches today's LeetCode Daily Challenge problem with its details, difficulty, and constraints.",
        {
            raw: z.boolean().optional().default(false).describe("Return raw API response if true (default: false)")
        },
        safeToolHandler(({ raw }) => problemService.getDailyProblem(raw))
    );

    // Get specific problem by slug
    mcp.tool(
        "leetcode_get_problem",
        "Fetches detailed information about a specific LeetCode problem by its title slug (e.g., 'two-sum').",
        {
            titleSlug: z.string().describe("The URL slug of the problem (e.g., 'two-sum', 'add-two-numbers')"),
            raw: z.boolean().optional().default(false).describe("Return raw API response if true (default: false)")
        },
        safeToolHandler(({ titleSlug, raw }) => problemService.getSelectProblem(titleSlug, raw))
    );

    // Get problems list
    mcp.tool(
        "leetcode_get_problems",
        "Fetches a filtered list of LeetCode problems with pagination, difficulty filter, and category support.",
        {
            limit: z.number().optional().default(20).describe("Number of problems to return"),
            skip: z.number().optional().default(0).describe("Number of problems to skip (for pagination)"),
            categorySlug: z.string().optional().describe("Category slug to filter by (e.g., 'algorithms', 'database')"),
            filters: z.object({
                difficulty: z.string().optional().describe("Difficulty filter: 'EASY', 'MEDIUM', or 'HARD'"),
                tags: z.array(z.string()).optional().describe("Array of tag slugs to filter by")
            }).optional().describe("Optional filters object")
        },
        safeToolHandler((params) => problemService.getProblems(params))
    );

    // Get official solution
    mcp.tool(
        "leetcode_get_official_solution",
        "Fetches the official LeetCode solution/editorial for a specific problem.",
        {
            titleSlug: z.string().describe("The URL slug of the problem (e.g., 'two-sum')")
        },
        safeToolHandler(({ titleSlug }) => problemService.getOfficialSolution(titleSlug))
    );

    // ==================== DISCUSSION TOOLS ====================

    // Get trending discussions
    mcp.tool(
        "leetcode_get_trending_discussions",
        "Fetches the top trending discussions from LeetCode's discussion forum.",
        {
            first: z.number().optional().default(10).describe("Number of trending discussions to return (default: 10)")
        },
        safeToolHandler(({ first }) => discussionService.getTrendingDiscuss(first))
    );

    // Get specific discussion topic
    mcp.tool(
        "leetcode_get_discussion_topic",
        "Fetches a specific discussion topic by its ID, including the full content and metadata.",
        {
            topicId: z.number().describe("The numeric ID of the discussion topic")
        },
        safeToolHandler(({ topicId }) => discussionService.getDiscussTopic(topicId))
    );

    // Get discussion comments
    mcp.tool(
        "leetcode_get_discussion_comments",
        "Fetches comments/replies on a specific LeetCode discussion topic.",
        {
            topicId: z.number().describe("The numeric ID of the discussion topic"),
            orderBy: z.string().optional().default("hot").describe("Order by: 'hot', 'newest', or 'oldest'"),
            pageNo: z.number().optional().default(1).describe("Page number for pagination"),
            numPerPage: z.number().optional().default(10).describe("Number of comments per page")
        },
        safeToolHandler((params) => discussionService.getDiscussComments(params))
    );
}
