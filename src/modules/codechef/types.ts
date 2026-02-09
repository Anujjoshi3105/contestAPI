export interface CodeChefRating {
    username: string;
    platform: string;
    rating: number | string;
    level: string;
    max_rating?: number | string;
}

export interface UserQuery {
    username: string;
}
export interface CodeChefUserRating {
    rating: number;
    max_rating?: number;
}
