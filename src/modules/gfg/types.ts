export interface GFGRating {
    username: string;
    platform: string;
    rating: number | string;
    level: string;
}

export interface UserQuery {
    username: string;
}

export interface SubmissionsQuery {
    handle: string;
    requestType?: string;
    year?: string;
    month?: string;
}

export interface GFGSubmission {
    slug: string;
    pname: string;
    lang: string;
}

export interface GFGSubmissionsResponse {
    status: string;
    message: string;
    result: {
        [difficulty: string]: {
            [id: string]: GFGSubmission;
        };
    };
    count: number;
}

export interface UserPostsQuery {
    username: string;
    fetch_type?: string;
    page?: number;
}

export interface LeaderboardQuery {
    leaderboard_type?: number;
    page?: number;
    year_month?: string;
}

export interface PromotionalEventsQuery {
    page_source: string;
    user_country_code?: string;
}
export interface GFGUserRating {
    rating: number | string;
    stars: string;
}

export interface GFGPost {
    id: number;
    title: string;
    content: string;
    creationDate: string;
    author: string;
}

export interface GFGPromotionalEvent {
    id: number;
    link: string;
    title: string;
    image: string;
}

export interface GFGLeaderboard {
    users: {
        handle: string;
        rank: number;
        score: number;
    }[];
}
