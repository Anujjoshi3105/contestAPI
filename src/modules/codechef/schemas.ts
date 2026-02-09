export const userRatingSchema = {
    summary: 'Get User Rating',
    description: 'Fetches CodeChef user rating and platform details',
    tags: ['CodeChef'],
    querystring: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'CodeChef username' },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                platform: { type: 'string' },
                rating: { type: 'number' }
            }
        }
    }
};

