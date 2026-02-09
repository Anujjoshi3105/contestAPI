import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { safeToolHandler } from "./base";
import * as service from "../../codechef/service";

/**
 * Registers all CodeChef-related MCP tools.
 */
export function register(mcp: McpServer): void {
    // Get user rating
    mcp.tool(
        "codechef_get_rating",
        "Fetches a CodeChef user's current rating, star level (1★ to 7★), and maximum rating achieved.",
        { username: z.string().describe("The CodeChef username") },
        safeToolHandler(({ username }) => service.getUserRating(username))
    );
}
