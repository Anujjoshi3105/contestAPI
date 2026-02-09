export type Difficulty = 'All' | 'Easy' | 'Medium' | 'Hard';

export interface Badge {
    name: string;
    icon: string;
}

export interface SkillStats {
    tagName: string;
    tagSlug: string;
    problemsSolved: number;
}

export interface UserDataProfile {
    aboutMe: string;
    company?: string;
    countryName?: string;
    realName: string;
    birthday?: string;
    userAvatar: string;
    ranking: number;
    reputation: number;
    school?: string;
    skillTags: string[];
    websites: string[];
}

export interface MatchedUser {
    activeBadge: Badge;
    badges: Badge[];
    githubUrl: string;
    linkedinUrl?: string;
    profile: UserDataProfile;
    upcomingBadges: Badge[];
    username: string;
    twitterUrl?: string;
    userCalendar: {
        activeYears: number[];
        streak: number;
        totalActiveDays: number;
        dccBadge: {
            timestamp: number;
            badge: {
                name: string;
                icon: string;
            };
        }[];
        submissionCalendar: string;
    };
    submitStats: {
        totalSubmissionNum: {
            difficulty: Difficulty;
            count: number;
            submissions: number;
        }[];
        acSubmissionNum: {
            difficulty: Difficulty;
            count: number;
            submissions: number;
        }[];
        count: number;
    };
    tagProblemCounts: {
        fundamental: SkillStats[];
        intermediate: SkillStats[];
        advanced: SkillStats[];
    };
    languageProblemCount: { languageName: string; problemsSolved: number }[];
}

export interface UserData {
    userContestRanking: null | {
        attendedContestsCount: number;
        badge: Badge;
        globalRanking: number;
        rating: number;
        totalParticipants: number;
        topPercentage: number;
    };
    userContestRankingHistory: {
        attended: boolean;
        rating: number;
        ranking: number;
        trendDirection: string;
        problemsSolved: number;
        totalProblems: number;
        finishTimeInSeconds: number;
        contest: {
            title: string;
            startTime: string;
        };
    }[];
    matchedUser: MatchedUser;
    recentAcSubmissionList: object[];
    recentSubmissionList: Submission[];
    userProfileUserQuestionProgressV2: { count: number; difficulty: string }[];
}

export interface Submission {
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
}

export interface Question {
    content: string;
    companyTagStats: string[];
    difficulty: Difficulty;
    dislikes: number;
    exampleTestcases: object[];
    hints: object[];
    isPaidOnly: boolean;
    likes: number;
    questionId: number;
    questionFrontendId: number;
    solution: string;
    similarQuestions: object[];
    title: string;
    titleSlug: string;
    topicTags: string[];
}

export interface Contest {
    title: string;
    titleSlug: string;
    startTime: number;
    duration: number;
    originStartTime: number;
    isVirtual: boolean;
    containsPremium: boolean;
}

export interface ProblemSetQuestionListData {
    problemsetQuestionList: {
        total: number;
        questions: object[];
    };
}

export interface DailyProblemData {
    activeDailyCodingChallengeQuestion: {
        date: string;
        link: string;
        question: Question;
    };
}

export interface SelectProblemData {
    question: Question;
}

export interface TrendingDiscussionObject {
    data: {
        cachedTrendingCategoryTopics: {
            id: number;
            title: string;
            post: {
                id: number;
                creationDate: number;
                contentPreview: string;
                author: {
                    username: string;
                    isActive: boolean;
                    profile: {
                        userAvatar: string;
                    };
                };
            };
        }[];
    };
}

export interface UserProfileResponse {
    matchedUser: {
        submitStats: {
            acSubmissionNum: Array<{ count: number }>;
            totalSubmissionNum: unknown;
        };
        submissionCalendar: string;
        profile: {
            ranking: number;
            reputation: number;
        };
        contributions: {
            points: number;
        };
    };
    allQuestionsCount: Array<{ count: number }>;
    recentSubmissionList: unknown[];
}

export interface ContestRatingHistogram {
    userCount: number;
    ratingStart: number;
    ratingEnd: number;
    topPercentage: number;
}

export interface ContestHistogramResponse {
    contestRatingHistogram: ContestRatingHistogram[];
}

export interface ContestRankingQuery {
    username: string;
}

export interface ContestRankingResponse {
    userContestRanking: null | {
        attendedContestsCount: number;
        badge: Badge;
        globalRanking: number;
        rating: number;
        totalParticipants: number;
        topPercentage: number;
    };
    userContestRankingHistory: {
        attended: boolean;
        rating: number;
        ranking: number;
        trendDirection: string;
        problemsSolved: number;
        totalProblems: number;
        finishTimeInSeconds: number;
        contest: {
            title: string;
            startTime: string;
        };
    }[];
}

export interface UserRatingData {
    userContestRanking: {
        rating: number;
        attendedContestsCount: number;
        badge: {
            name: string;
        } | null;
        globalRanking: number;
        topPercentage: number;
    } | null;
}

export interface OfficialSolutionData {
    question: {
        solution: {
            id: string;
            title: string;
            content: string;
            contentTypeId: string;
            paidOnly: boolean;
            hasVideoSolution: boolean;
            paidOnlyVideo: boolean;
            canSeeDetail: boolean;
            rating: {
                count: number;
                average: number;
                userRating: {
                    score: number;
                } | null;
            };
            topic: {
                id: number;
                commentCount: number;
                topLevelCommentCount: number;
                viewCount: number;
                subscribed: boolean;
                solutionTags: {
                    name: string;
                    slug: string;
                }[];
                post: {
                    id: number;
                    status: string;
                    creationDate: number;
                    author: {
                        username: string;
                        isActive: boolean;
                        profile: {
                            userAvatar: string;
                            reputation: number;
                        };
                    };
                };
            };
        } | null;
    };
}

export interface TrendingDiscussData {
    cachedTrendingCategoryTopics: {
        id: number;
        title: string;
        post: {
            id: number;
            creationDate: number;
            contentPreview: string;
            author: {
                username: string;
                isActive: boolean;
                profile: {
                    userAvatar: string;
                };
            };
        };
    }[];
}

export interface DiscussPost {
    id: number;
    voteCount: number;
    voteStatus: number;
    content: string;
    updationDate: number;
    creationDate: number;
    status: string;
    isHidden: boolean;
    coinRewards: {
        id: string;
        score: number;
        description: string;
        date: string;
    }[];
    author: {
        isDiscussAdmin: boolean;
        isDiscussStaff: boolean;
        username: string;
        nameColor: string | null;
        activeBadge: {
            displayName: string;
            icon: string;
        } | null;
        profile: {
            userAvatar: string;
            reputation: number;
        };
        isActive: boolean;
    };
    authorIsModerator: boolean;
    isOwnPost: boolean;
}

export interface DiscussTopicData {
    topic: {
        id: number;
        viewCount: number;
        topLevelCommentCount: number;
        subscribed: boolean;
        title: string;
        pinned: boolean;
        tags: string[];
        hideFromTrending: boolean;
        post: DiscussPost;
    } | null;
}

export interface DiscussCommentsData {
    topicComments: {
        data: {
            id: string;
            pinned: boolean;
            pinnedBy: {
                username: string;
            } | null;
            post: DiscussPost;
            numChildren: number;
        }[];
    };
}

export interface UserCalendarData {
    matchedUser: {
        userCalendar: {
            activeYears: number[];
            streak: number;
            totalActiveDays: number;
            dccBadges: {
                timestamp: number;
                badge: {
                    name: string;
                    icon: string;
                };
            }[];
            submissionCalendar: string;
        };
    };
}

export interface UserQuestionProgressData {
    userProfileUserQuestionProgressV2: {
        numAcceptedQuestions: {
            count: number;
            difficulty: string;
        }[];
        numFailedQuestions: {
            count: number;
            difficulty: string;
        }[];
        numUntouchedQuestions: {
            count: number;
            difficulty: string;
        }[];
        userSessionBeatsPercentage: {
            difficulty: string;
            percentage: number;
        }[];
    };
}

export interface SkillStatsData {
    matchedUser: {
        tagProblemCounts: {
            advanced: SkillStats[];
            intermediate: SkillStats[];
            fundamental: SkillStats[];
        };
    };
}

export interface LanguageStatsData {
    matchedUser: {
        languageProblemCount: {
            languageName: string;
            problemsSolved: number;
        }[];
    };
}

export interface AcSubmissionsData {
    recentAcSubmissionList: {
        title: string;
        titleSlug: string;
        timestamp: string;
        statusDisplay: string;
        lang: string;
    }[];
}

export interface SubmissionsData {
    recentSubmissionList: Submission[];
}

export interface ContestData {
    userContestRanking: {
        attendedContestsCount: number;
        rating: number;
        globalRanking: number;
        totalParticipants: number;
        topPercentage: number;
        badge: {
            name: string;
        } | null;
    } | null;
    userContestRankingHistory: {
        attended: boolean;
        rating: number;
        ranking: number;
        trendDirection: string;
        problemsSolved: number;
        totalProblems: number;
        finishTimeInSeconds: number;
        contest: {
            title: string;
            startTime: string;
        };
    }[];
}

export interface UserRatingResponse {
    username: string;
    platform: string;
    rating: number;
    contests_participated: number;
    level: string;
    rank?: number;
    top_percentage?: number;
}
