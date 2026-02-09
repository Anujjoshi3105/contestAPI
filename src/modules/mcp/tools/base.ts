import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Creates a safe tool handler that wraps async operations with standardized error handling.
 * Automatically catches exceptions and formats them as MCP-compliant error responses.
 *
 * @param handler - The async function that performs the actual tool logic
 * @returns A wrapped handler with consistent error handling
 */
export function safeToolHandler<T>(
    handler: (args: T) => Promise<unknown>
): (args: T) => Promise<{ isError?: boolean; content: { type: "text"; text: string }[];[x: string]: unknown }> {
    return async (args: T) => {
        try {
            const result = await handler(args);
            return {
                content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
            };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "An unexpected error occurred";
            console.error("[MCP Tool Error]", message);
            return {
                isError: true,
                content: [{ type: "text" as const, text: `Error: ${message}` }],
            };
        }
    };
}

/**
 * Type definition for a tool registration function.
 */
export type ToolRegistrar = (mcp: McpServer) => void;
