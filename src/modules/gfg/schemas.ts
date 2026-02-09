export const userRatingSchema = {
    summary: 'Get User Rating',
    description: 'Fetches GeeksforGeeks user rating and platform details',
    tags: ['GFG'],
    querystring: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'GFG username' },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                platform: { type: 'string' },
                rating: { type: ['number', 'string'] },
                level: { type: 'string' }
            }
        }
    }
};

export const userSubmissionsSchema = {
    summary: 'Get User Submissions',
    description: 'Fetches problems solved by a GFG user',
    tags: ['GFG'],
    body: {
        type: 'object',
        properties: {
            handle: { type: 'string', description: 'GFG handle' },
            requestType: { type: 'string', default: "" },
            year: { type: 'string', default: "" },
            month: { type: 'string', default: "" }
        },
        required: ['handle']
    }
};

export const userPostsSchema = {
    summary: 'Get User Posts',
    description: 'Fetches articles and posts written by a GFG user',
    tags: ['GFG'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string' }
        },
        required: ['username']
    },
    querystring: {
        type: 'object',
        properties: {
            fetch_type: { type: 'string', default: 'posts' },
            page: { type: 'number', default: 1 }
        }
    }
};

export const promotionalEventsSchema = {
    summary: 'Get Promotional Events',
    description: 'Fetches promotional events from GFG',
    tags: ['GFG'],
    querystring: {
        type: 'object',
        properties: {
            page_source: { type: 'string' },
            user_country_code: { type: 'string', default: 'IN' }
        },
        required: ['page_source']
    }
};

export const contestLeaderboardSchema = {
    summary: 'Get Contest Leaderboard',
    description: 'Fetches the leaderboard for GFG weekly coding contests',
    tags: ['GFG'],
    querystring: {
        type: 'object',
        properties: {
            leaderboard_type: { type: 'number', default: 0 },
            page: { type: 'number', default: 1 },
            year_month: { type: 'string', default: "" }
        }
    }
};
