export const userRatingSchema = {
    summary: 'Get User Rating',
    description: 'Fetches Codeforces user rating and rank details',
    tags: ['Codeforces - User'],
    querystring: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'Codeforces handle' },
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
                level: { type: 'string' },
                max_rating: { type: ['number', 'string'] },
                max_level: { type: 'string' },
                contribution: { type: 'number' },
                friendOfCount: { type: 'number' },
                avatar: { type: 'string' }
            }
        }
    }
};

export const contestHistorySchema = {
    summary: 'Get Contest History',
    description: 'Fetches Codeforces contest participation history',
    tags: ['Codeforces - User'],
    querystring: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'Codeforces handle' },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    contestId: { type: 'number' },
                    contestName: { type: 'string' },
                    handle: { type: 'string' },
                    rank: { type: 'number' },
                    ratingUpdateTimeSeconds: { type: 'number' },
                    oldRating: { type: 'number' },
                    newRating: { type: 'number' }
                }
            }
        }
    }
};

export const userStatusSchema = {
    summary: 'Get User Status',
    description: 'Fetches Codeforces user submission status/history',
    tags: ['Codeforces - User'],
    querystring: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'Codeforces handle' },
            from: { type: 'number', description: 'Starting index (1-based)', default: 1 },
            count: { type: 'number', description: 'Number of submissions to fetch', default: 10 },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    contestId: { type: 'number' },
                    problem: {
                        type: 'object',
                        properties: {
                            contestId: { type: 'number' },
                            index: { type: 'string' },
                            name: { type: 'string' },
                            rating: { type: 'number' },
                            tags: { type: 'array', items: { type: 'string' } }
                        }
                    },
                    verdict: { type: 'string' },
                    programmingLanguage: { type: 'string' },
                    creationTimeSeconds: { type: 'number' }
                }
            }
        }
    }
};

export const userBlogsSchema = {
    summary: 'Get User Blogs',
    description: 'Fetches blog posts written by a Codeforces user',
    tags: ['Codeforces - User'],
    querystring: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'Codeforces handle' },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    title: { type: 'string' },
                    creationTimeSeconds: { type: 'number' },
                    rating: { type: 'number' }
                }
            }
        }
    }
};

export const solvedProblemsSchema = {
    summary: 'Get Solved Problems',
    description: 'Fetches a list of problems solved by a Codeforces user',
    tags: ['Codeforces - User'],
    querystring: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'Codeforces handle' },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    rating: { type: 'number' },
                    tags: { type: 'array', items: { type: 'string' } },
                    link: { type: 'string' }
                }
            }
        }
    }
};

export const contestsSchema = {
    summary: 'Get Contests',
    description: 'Fetches a list of Codeforces contests',
    tags: ['Codeforces - Contests'],
    querystring: {
        type: 'object',
        properties: {
            gym: { type: 'boolean', description: 'Whether to include gym contests', default: false }
        }
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    type: { type: 'string' },
                    phase: { type: 'string' },
                    frozen: { type: 'boolean' },
                    durationSeconds: { type: 'number' },
                    startTimeSeconds: { type: 'number' },
                    relativeTimeSeconds: { type: 'number' }
                }
            }
        }
    }
};

export const recentActionsSchema = {
    summary: 'Get Recent Actions',
    description: 'Fetches recent actions on Codeforces (blogs, comments, etc.)',
    tags: ['Codeforces - Blog'],
    querystring: {
        type: 'object',
        properties: {
            maxCount: { type: 'number', description: 'Maximum number of actions to fetch', default: 20 }
        }
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    timeSeconds: { type: 'number' },
                    blogEntry: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            title: { type: 'string' }
                        }
                    },
                    comment: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            text: { type: 'string' },
                            commentatorHandle: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
};

export const problemsSchema = {
    summary: 'Get Problemset Problems',
    description: 'Fetches problems from the Codeforces problemset',
    tags: ['Codeforces - Problems'],
    querystring: {
        type: 'object',
        properties: {
            tags: { type: 'string', description: 'Semicolon-separated list of tags' }
        }
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    contestId: { type: 'number' },
                    index: { type: 'string' },
                    name: { type: 'string' },
                    rating: { type: 'number' },
                    tags: { type: 'array', items: { type: 'string' } }
                }
            }
        }
    }
};

export const contestStandingsSchema = {
    summary: 'Get Contest Standings',
    description: 'Fetches the scoreboard of a specific contest',
    tags: ['Codeforces - Contests'],
    querystring: {
        type: 'object',
        properties: {
            contestId: { type: 'number', description: 'ID of the contest' },
            from: { type: 'number', description: 'Starting index (1-based)', default: 1 },
            count: { type: 'number', description: 'Number of rows to fetch', default: 10 },
            handles: { type: 'string', description: 'Semicolon-separated list of handles' },
            room: { type: 'number', description: 'Room number' },
            showUnofficial: { type: 'boolean', description: 'Whether to show unofficial results', default: false }
        },
        required: ['contestId']
    }
};

export const contestRatingChangesSchema = {
    summary: 'Get Contest Rating Changes',
    description: 'Fetches rating changes for all participants after a contest',
    tags: ['Codeforces - Contests'],
    querystring: {
        type: 'object',
        properties: {
            contestId: { type: 'number', description: 'ID of the contest' }
        },
        required: ['contestId']
    }
};

export const contestHacksSchema = {
    summary: 'Get Contest Hacks',
    description: 'Fetches a list of all hacks in a contest',
    tags: ['Codeforces - Contests'],
    querystring: {
        type: 'object',
        properties: {
            contestId: { type: 'number', description: 'ID of the contest' }
        },
        required: ['contestId']
    }
};

export const contestStatusSchema = {
    summary: 'Get Contest Status',
    description: 'Fetches submissions for a specific contest',
    tags: ['Codeforces - Contests'],
    querystring: {
        type: 'object',
        properties: {
            contestId: { type: 'number', description: 'ID of the contest' },
            handle: { type: 'string', description: 'Codeforces handle' },
            from: { type: 'number', description: 'Starting index (1-based)', default: 1 },
            count: { type: 'number', description: 'Number of submissions to fetch', default: 10 }
        },
        required: ['contestId']
    }
};

export const problemsetRecentStatusSchema = {
    summary: 'Get Problemset Recent Status',
    description: 'Fetches recent submissions across the platform',
    tags: ['Codeforces - Problems'],
    querystring: {
        type: 'object',
        properties: {
            count: { type: 'number', description: 'Number of submissions to fetch', default: 10 }
        },
        required: ['count']
    }
};

export const blogEntrySchema = {
    summary: 'Get Blog Entry',
    description: 'Fetches a specific blog entry',
    tags: ['Codeforces - Blog'],
    querystring: {
        type: 'object',
        properties: {
            blogEntryId: { type: 'number', description: 'ID of the blog entry' }
        },
        required: ['blogEntryId']
    }
};

export const blogCommentsSchema = {
    summary: 'Get Blog Comments',
    description: 'Fetches comments for a specific blog entry',
    tags: ['Codeforces - Blog'],
    querystring: {
        type: 'object',
        properties: {
            blogEntryId: { type: 'number', description: 'ID of the blog entry' }
        },
        required: ['blogEntryId']
    }
};
