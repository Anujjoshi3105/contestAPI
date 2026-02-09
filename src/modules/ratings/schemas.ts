export const allRatingsSchema = {
    summary: 'Get All Platform Ratings',
    description: 'Fetches aggregate ratings and stats from all supported platforms (LeetCode, Codeforces, CodeChef, AtCoder, GFG) for a given username.',
    tags: ['Ratings'],
    querystring: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'Unified username for all platforms' },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                codeforces: { type: 'object', additionalProperties: true },
                codechef: { type: 'object', additionalProperties: true },
                leetcode: { type: 'object', additionalProperties: true },
                atcoder: { type: 'object', additionalProperties: true },
                gfg: { type: 'object', additionalProperties: true }
            }
        }
    }
};

export const platformRatingSchema = {
    summary: 'Get Specific Platform Rating',
    description: 'Fetches the rating and statistics for a single specified competitive programming platform.',
    tags: ['Ratings'],
    params: {
        type: 'object',
        properties: {
            platform: {
                type: 'string',
                description: 'The platform slug',
                enum: ['codeforces', 'codechef', 'leetcode', 'atcoder', 'gfg']
            },
        },
        required: ['platform']
    },
    querystring: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'Username on the target platform' },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'object',
            additionalProperties: true
        }
    }
};
