export const userRatingSchema = {
    summary: 'Get User Rating',
    description: 'Fetches AtCoder user rating, rank, and platform details',
    tags: ['AtCoder'],
    querystring: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'AtCoder username' },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                display_name: { type: 'string' },
                platform: { type: 'string' },
                rating: { type: 'number' },
                max_rating: { type: 'number' },
                level: { type: 'string' },
                rank: { type: 'string' },
                contests_participated: { type: 'number' },
                last_competed: { type: 'string' },
                kyu: { type: 'string' },
                country: { type: 'string' },
                birth_year: { type: 'string' },
                avatar: { type: 'string' },
                rating_history: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            IsRated: { type: 'boolean' },
                            Place: { type: 'number' },
                            OldRating: { type: 'number' },
                            NewRating: { type: 'number' },
                            Performance: { type: 'number' },
                            InnerPerformance: { type: 'number' },
                            ContestScreenName: { type: 'string' },
                            ContestName: { type: 'string' },
                            ContestNameEn: { type: 'string' },
                            EndTime: { type: 'string' },
                        }
                    }
                }
            }
        }
    }
};

export const userHistorySchema = {
    summary: 'Get User History',
    description: 'Fetches AtCoder user rating history directly from the JSON endpoint',
    tags: ['AtCoder'],
    querystring: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'AtCoder username' },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    IsRated: { type: 'boolean' },
                    Place: { type: 'number' },
                    OldRating: { type: 'number' },
                    NewRating: { type: 'number' },
                    Performance: { type: 'number' },
                    InnerPerformance: { type: 'number' },
                    ContestScreenName: { type: 'string' },
                    ContestName: { type: 'string' },
                    ContestNameEn: { type: 'string' },
                    EndTime: { type: 'string' },
                }
            }
        }
    }
};

export const contestStandingsSchema = {
    summary: 'Get Contest Standings',
    description: 'Fetches AtCoder contest standings in JSON format',
    tags: ['AtCoder'],
    querystring: {
        type: 'object',
        properties: {
            contestId: { type: 'string', description: 'AtCoder contest ID (e.g., abc300)' },
            extended: { type: 'boolean', description: 'Whether to fetch extended standings' },
        },
        required: ['contestId'],
    },
    response: {
        200: {
            type: 'object',
            additionalProperties: true
        }
    }
};

export const contestResultsSchema = {
    summary: 'Get Contest Results',
    description: 'Fetches AtCoder contest results in JSON format',
    tags: ['AtCoder'],
    querystring: {
        type: 'object',
        properties: {
            contestId: { type: 'string', description: 'AtCoder contest ID' },
        },
        required: ['contestId'],
    },
    response: {
        200: {
            type: 'object',
            additionalProperties: true
        }
    }
};

export const virtualStandingsSchema = {
    summary: 'Get Virtual Standings',
    description: 'Fetches AtCoder virtual standings in JSON format',
    tags: ['AtCoder'],
    querystring: {
        type: 'object',
        properties: {
            contestId: { type: 'string', description: 'AtCoder contest ID' },
            showGhost: { type: 'boolean', description: 'Whether to show ghost entries' },
        },
        required: ['contestId'],
    },
    response: {
        200: {
            type: 'object',
            additionalProperties: true
        }
    }
};

