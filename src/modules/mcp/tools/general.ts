import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Registers general utility MCP tools.
 */
export function register(mcp: McpServer): void {
    // Hello greeting tool
    mcp.tool(
        "hello",
        "A simple greeting tool that welcomes users to the vortex MCP Server. Use this to verify connectivity.",
        { name: z.string().describe("The name of the user to greet") },
        async ({ name }) => ({
            content: [{ type: "text", text: `Hello, ${name}! Welcome to the vortex MCP Server. I can help you fetch competitive programming data from LeetCode, Codeforces, AtCoder, CodeChef, and GeeksforGeeks.` }],
        })
    );

    // Server info tool
    mcp.tool(
        "server_info",
        "Returns information about the vortex MCP Server including version, supported platforms, and available API categories.",
        {},
        async () => ({
            content: [{
                type: "text",
                text: JSON.stringify({
                    name: "vortex MCP Server",
                    version: "1.0.0",
                    supportedPlatforms: [
                        { name: "LeetCode", tools: 22 },
                        { name: "Codeforces", tools: 15 },
                        { name: "AtCoder", tools: 5 },
                        { name: "CodeChef", tools: 1 },
                        { name: "GeeksforGeeks", tools: 5 }
                    ],
                    totalTools: 50,
                    capabilities: ["User ratings", "Contest history", "Submissions", "Problem sets", "Leaderboards"]
                }, null, 2)
            }],
        })
    );
}
