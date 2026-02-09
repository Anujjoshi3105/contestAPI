import { FastifyPluginAsync } from 'fastify';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { streamableHttp, Sessions } from "fastify-mcp";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

import { registerAllTools } from "./tools";
import { registerAllPrompts } from "./prompts";
import { registerAllResources } from "./resources";

function createMcpServer(): Server {
    const mcp = new McpServer({
        name: "vortex",
        version: "1.0.0",
    });

    registerAllTools(mcp);
    registerAllPrompts(mcp);
    registerAllResources(mcp);

    console.log("[MCP] Server initialized with tools, prompts and resources");

    return mcp.server;
}

export const mcpPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.addHook('onRoute', (routeOptions) => {
        if (routeOptions.url.startsWith('/mcp')) {
            routeOptions.schema = {
                ...routeOptions.schema,
                tags: ['MCP'],
            };
        }
    });

    fastify.register(streamableHttp, {
        stateful: true,
        mcpEndpoint: "/mcp",
        sessions: new Sessions<StreamableHTTPServerTransport>(),
        createServer: createMcpServer,
    });
};

