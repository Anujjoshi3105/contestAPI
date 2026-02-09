export interface SuccessResponse<T = any> {
    success: true;
    data: T;
}

export interface ErrorResponse {
    success: false;
    error: string;
    message?: string;
}

export interface PlatformRating {
    username: string;
    platform: string;
    rating: number | string;
    level?: string;
    contests_participated?: number;
    max_rating?: number | string;
    max_level?: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
