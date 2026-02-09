export const contestRankingSchema = {
    description: 'Fetches LeetCode contest ranking for a user',
    tags: ['LeetCode - Contests'],
    querystring: {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                description: 'LeetCode username',
            },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                userContestRanking: {
                    type: ['object', 'null'],
                    properties: {
                        attendedContestsCount: { type: 'number' },
                        rating: { type: 'number' },
                        globalRanking: { type: 'number' },
                        totalParticipants: { type: 'number' },
                        topPercentage: { type: 'number' },
                        badge: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                            },
                        },
                    },
                },
                userContestRankingHistory: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            attended: { type: 'boolean' },
                            rating: { type: 'number' },
                            ranking: { type: 'number' },
                            trendDirection: { type: 'string' },
                            problemsSolved: { type: 'number' },
                            totalProblems: { type: 'number' },
                            finishTimeInSeconds: { type: 'number' },
                            contest: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string' },
                                    startTime: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export const userRatingSchema = {
    description: 'Fetches LeetCode user rating',
    tags: ['LeetCode - Contests'],
    querystring: {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                description: 'LeetCode username',
            },
        },
        required: ['username'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                platform: { type: 'string' },
                rating: { type: 'number' },
                contests_participated: { type: 'number' },
                level: { type: 'string' },
            },
        },
    },
};

export const contestHistogramSchema = {
    description: 'Fetches LeetCode contest rating distribution (histogram)',
    tags: ['LeetCode - Contests'],
    response: {
        200: {
            type: 'object',
            properties: {
                contestRatingHistogram: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            userCount: { type: 'number' },
                            ratingStart: { type: 'number' },
                            ratingEnd: { type: 'number' },
                            topPercentage: { type: 'number' },
                        },
                    },
                },
            },
        },
    },
};

export const allContestsSchema = {
    description: 'Fetches all LeetCode contests',
    tags: ['LeetCode - Contests'],
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    titleSlug: { type: 'string' },
                    startTime: { type: 'number' },
                    duration: { type: 'number' },
                    originStartTime: { type: 'number' },
                    isVirtual: { type: 'boolean' },
                    containsPremium: { type: 'boolean' },
                },
            },
        },
    },
};

export const dailyProblemSchema = {
    description: 'Fetches the LeetCode daily problem challenge',
    tags: ['LeetCode - Problems'],
    response: {
        200: {
            type: 'object',
            properties: {
                questionLink: { type: 'string' },
                date: { type: 'string' },
                questionId: { type: 'string' },
                questionFrontendId: { type: 'string' },
                questionTitle: { type: 'string' },
                titleSlug: { type: 'string' },
                difficulty: { type: 'string' },
                isPaidOnly: { type: 'boolean' },
                question: { type: 'string' },
                exampleTestcases: { type: 'array', items: { type: 'string' } },
                topicTags: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, slug: { type: 'string' } } } },
                hints: { type: 'array', items: { type: 'string' } },
                likes: { type: 'number' },
                dislikes: { type: 'number' }
            }
        }
    }
};

export const userDetailsSchema = {
    description: 'Fetches comprehensive LeetCode user details',
    tags: ['LeetCode - User'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'LeetCode username' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                name: { type: 'string' },
                birthday: { type: 'string' },
                avatar: { type: 'string' },
                ranking: { type: 'number' },
                reputation: { type: 'number' },
                gitHub: { type: 'string' },
                twitter: { type: 'string' },
                linkedIN: { type: 'string' },
                website: { type: 'array', items: { type: 'string' } },
                country: { type: 'string' },
                company: { type: 'string' },
                school: { type: 'string' },
                skillTags: { type: 'array', items: { type: 'string' } },
                about: { type: 'string' }
            }
        }
    }
};

export const userBadgesSchema = {
    description: 'Fetches all badges earned by a LeetCode user',
    tags: ['LeetCode - User'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'LeetCode username' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                badgesCount: { type: 'number' },
                badges: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            displayName: { type: 'string' },
                            icon: { type: 'string' }
                        }
                    }
                },
                upcomingBadges: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            icon: { type: 'string' }
                        }
                    }
                },
                activeBadge: {
                    type: 'object',
                    properties: {
                        displayName: { type: 'string' },
                        icon: { type: 'string' }
                    }
                }
            }
        }
    }
};

export const userSolvedSchema = {
    description: 'Fetches numbers of problems solved by difficulty for a user',
    tags: ['LeetCode - User'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'LeetCode username' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                solvedProblem: { type: 'number' },
                easySolved: { type: 'number' },
                mediumSolved: { type: 'number' },
                hardSolved: { type: 'number' },
                totalSubmissionNum: { type: 'array', items: { type: 'object', properties: { difficulty: { type: 'string' }, count: { type: 'number' }, submissions: { type: 'number' } } } },
                acSubmissionNum: { type: 'array', items: { type: 'object', properties: { difficulty: { type: 'string' }, count: { type: 'number' }, submissions: { type: 'number' } } } }
            }
        }
    }
};

export const trendingDiscussSchema = {
    description: 'Fetches trending discussion topics from LeetCode',
    tags: ['LeetCode - Discussion'],
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    title: { type: 'string' },
                    post: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            creationDate: { type: 'number' },
                            contentPreview: { type: 'string' },
                            author: {
                                type: 'object',
                                properties: {
                                    username: { type: 'string' },
                                    profile: {
                                        type: 'object',
                                        properties: {
                                            userAvatar: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export const upcomingContestsSchema = {
    description: 'Fetches upcoming LeetCode contests',
    tags: ['LeetCode - Contests'],
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    titleSlug: { type: 'string' },
                    startTime: { type: 'number' },
                    duration: { type: 'number' }
                }
            }
        }
    }
};

export const userSubmissionSchema = {
    description: 'Fetches recent submissions for a user',
    tags: ['LeetCode - User'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'LeetCode username' }
        }
    },
    querystring: {
        type: 'object',
        properties: {
            limit: { type: 'string', description: 'Number of submissions to return' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                count: { type: 'number' },
                submission: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            title: { type: 'string' },
                            titleSlug: { type: 'string' },
                            timestamp: { type: 'string' },
                            statusDisplay: { type: 'string' },
                            lang: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
};

export const userContestSchema = {
    description: 'Get user contest details',
    tags: ['LeetCode - User'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'LeetCode username' }
        }
    }
};

export const userContestHistorySchema = {
    description: 'Get user contest history',
    tags: ['LeetCode - User'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'LeetCode username' }
        }
    }
};

export const userCalendarSchema = {
    description: 'Get user submission calendar',
    tags: ['LeetCode - User'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'LeetCode username' }
        }
    },
    querystring: {
        type: 'object',
        properties: {
            year: { type: 'string', description: 'Year for the calendar' }
        }
    }
};

export const userSkillSchema = {
    description: 'Get user skill stats',
    tags: ['LeetCode - User'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'LeetCode username' }
        }
    }
};

export const userProfileSchema = {
    description: 'Get user profile',
    tags: ['LeetCode - User'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'LeetCode username' }
        }
    }
};

export const userLanguageSchema = {
    description: 'Get user language stats',
    tags: ['LeetCode - User'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'LeetCode username' }
        }
    }
};

export const userProgressSchema = {
    description: 'Get user progress',
    tags: ['LeetCode - User'],
    params: {
        type: 'object',
        properties: {
            username: { type: 'string', description: 'LeetCode username' }
        }
    }
};

export const selectProblemSchema = {
    description: 'Get a selected problem details',
    tags: ['LeetCode - Problems'],
    querystring: {
        type: 'object',
        properties: {
            titleSlug: { type: 'string', description: 'Problem title slug' },
            raw: { type: 'string', description: 'Whether to return raw content' }
        },
        required: ['titleSlug']
    }
};

export const listProblemsSchema = {
    description: 'List all problems from problemset',
    tags: ['LeetCode - Problems'],
    querystring: {
        type: 'object',
        properties: {
            offset: { type: 'string' },
            limit: { type: 'string' }
        }
    }
};

export const officialSolutionSchema = {
    description: 'Get official solution for a problem',
    tags: ['LeetCode - Problems'],
    querystring: {
        type: 'object',
        properties: {
            titleSlug: { type: 'string', description: 'Problem title slug' }
        },
        required: ['titleSlug']
    }
};

export const discussionTopicSchema = {
    description: 'Get discussion topic details',
    tags: ['LeetCode - Discussion'],
    params: {
        type: 'object',
        properties: {
            topicId: { type: 'string', description: 'Discussion topic ID' }
        }
    }
};

export const discussionCommentsSchema = {
    description: 'Get discussion comments for a topic',
    tags: ['LeetCode - Discussion'],
    params: {
        type: 'object',
        properties: {
            topicId: { type: 'string', description: 'Discussion topic ID' }
        }
    }
};
