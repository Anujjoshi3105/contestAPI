export function mapRating(rating: number): string {
    if (rating >= 2500) return '7 star';
    if (rating >= 2200) return '6 star';
    if (rating >= 2000) return '5 star';
    if (rating >= 1800) return '4 star';
    if (rating >= 1600) return '3 star';
    if (rating >= 1400) return '2 star';
    return '1 star';
}

export const CODECHEF_BASE_URL = 'https://www.codechef.com/users/';

export const CODECHEF_SELECTORS = {
    RATING: '.rating-number',
    MAX_RATING: '.rating-header small',
} as const;
