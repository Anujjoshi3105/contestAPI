import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as leetcodeTools from "./leetcode";
import * as codeforcesTools from "./codeforces";
import * as atcoderTools from "./atcoder";
import * as codechefTools from "./codechef";
import * as gfgTools from "./gfg";
import * as generalTools from "./general";

/**
 * Registers all MCP tools from all platform modules.
 * This is the single entry point for tool registration.
 *
 * @param mcp - The MCP Server instance to register tools with
 */
export function registerAllTools(mcp: McpServer): void {
    // Register platform-specific tools
    leetcodeTools.register(mcp);
    codeforcesTools.register(mcp);
    atcoderTools.register(mcp);
    codechefTools.register(mcp);
    gfgTools.register(mcp);

    // Register general utility tools
    generalTools.register(mcp);
}
