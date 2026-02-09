export interface UserHistory {
    IsRated: boolean;
    Place: number;
    OldRating: number;
    NewRating: number;
    Performance: number;
    InnerPerformance: number;
    ContestScreenName: string;
    ContestName: string;
    ContestNameEn: string;
    EndTime: string;
}

export interface AtCoderRating {
    username: string;
    display_name: string;
    platform: string;
    rating: number;
    max_rating: number;
    level: string;
    rank: string;
    contests_participated: number;
    last_competed: string;
    kyu: string;
    country: string;
    birth_year: string;
    avatar: string;
}

export interface UserQuery {
    username: string;
}

export interface ContestQuery {
    contestId: string;
}

export interface AtCoderUserRating {
    rating: number;
    max_rating: number;
    rank: string;
    contests_participated: number;
    last_competed: string;
    country: string;
    birth_year: string;
    avatar: string;
    display_name: string;
    kyu: string;
    rating_history: UserHistory[];
}

export interface ContestResult {
    IsRated: boolean;
    Place: number;
    OldRating: number;
    NewRating: number;
    Performance: number;
    InnerPerformance: number;
    ContestScreenName: string;
    ContestName: string;
    ContestNameEn: string;
    EndTime: string;
}

export interface StandingData {
    Rank: number;
    Additional: any;
    UserScreenName: string;
    UserDisplayName: string;
    IsRated: boolean;
    Rating: number;
    OldRating: number;
    TotalResult: {
        Count: number;
        Score: number;
        Elapsed: number;
        Penalty: number;
    };
    TaskResults: {
        [key: string]: {
            Count: number;
            Score: number;
            Elapsed: number;
            Status: number;
            Pending: boolean;
        };
    };
}

export interface ContestStandings {
    Fixed: boolean;
    AdditionalColumns: any[];
    TaskInfo: any[];
    StandingsData: StandingData[];
}
