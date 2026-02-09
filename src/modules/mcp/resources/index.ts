import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Registers all MCP resources.
 *
 * @param mcp - The MCP Server instance to register resources with
 */
export function registerAllResources(mcp: McpServer): void {
    // API Manifest resource
    mcp.resource(
        "api-manifest",
        "manifest://contest-api",
        {
            title: "vortex Manifest",
            description: "Metadata and platform support details for this vortex MCP instance"
        },
        async () => ({
            contents: [
                {
                    uri: "manifest://contest-api",
                    text: JSON.stringify({
                        name: "vortex",
                        version: "1.0.0",
                        description: "A comprehensive API for competitive programming data aggregation",
                        supportedPlatforms: [
                            {
                                name: "LeetCode",
                                endpoints: ["rating", "profile", "details", "badges", "solved", "contest", "submissions", "calendar", "skills", "languages", "progress"]
                            },
                            {
                                name: "Codeforces",
                                endpoints: ["rating", "history", "status", "blogs", "problems", "contests", "standings", "hacks"]
                            },
                            {
                                name: "AtCoder",
                                endpoints: ["rating", "history", "standings", "results", "virtual"]
                            },
                            {
                                name: "CodeChef",
                                endpoints: ["rating"]
                            },
                            {
                                name: "GeeksforGeeks",
                                endpoints: ["rating", "submissions", "posts", "events", "leaderboard"]
                            }
                        ],
                        mcpEndpoints: {
                            mcp: "/mcp",
                            health: "/health",
                            docs: "/docs"
                        }
                    }, null, 2),
                    mimeType: "application/json"
                }
            ]
        })
    );

    // Platforms overview resource
    mcp.resource(
        "platforms-overview",
        "docs://platforms",
        {
            title: "Supported Platforms Overview",
            description: "Detailed information about each supported competitive programming platform"
        },
        async () => ({
            contents: [
                {
                    uri: "docs://platforms",
                    text: JSON.stringify({
                        platforms: [
                            {
                                name: "LeetCode",
                                website: "https://leetcode.com",
                                focus: "Technical interview preparation and weekly/biweekly contests",
                                ratingSystem: "Algorithm rating (starts at 1500)",
                                toolCount: 13
                            },
                            {
                                name: "Codeforces",
                                website: "https://codeforces.com",
                                focus: "Competitive programming contests and problem archive",
                                ratingSystem: "Elo-like rating with colored ranks (Newbie to Legendary Grandmaster)",
                                toolCount: 15
                            },
                            {
                                name: "AtCoder",
                                website: "https://atcoder.jp",
                                focus: "Japanese competitive programming platform with ABC/ARC/AGC contests",
                                ratingSystem: "Rating with colored ranks (Gray to Red)",
                                toolCount: 5
                            },
                            {
                                name: "CodeChef",
                                website: "https://www.codechef.com",
                                focus: "Monthly challenges and competitive programming",
                                ratingSystem: "Star-based rating (1★ to 7★)",
                                toolCount: 1
                            },
                            {
                                name: "GeeksforGeeks",
                                website: "https://www.geeksforgeeks.org",
                                focus: "DSA learning and coding contests",
                                ratingSystem: "Score-based with star levels",
                                toolCount: 5
                            }
                        ]
                    }, null, 2),
                    mimeType: "application/json"
                }
            ]
        })
    );
}
