export interface AggregateRatingsResponse {
    username: string;
    codeforces: any;
    codechef: any;
    leetcode: any;
    atcoder: any;
    gfg: any;
}

export interface PlatformQuery {
    username: string;
}

export interface PlatformParams {
    platform: string;
}
