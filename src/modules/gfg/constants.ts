export const GFG_BASE_URL = 'https://www.geeksforgeeks.org/user/';

export const GFG_SELECTORS = {
    NEXT_DATA: 'script#__NEXT_DATA__',
} as const;

export function mapRating(rating: number): string {
    if (rating >= 2500) return '7 star';
    if (rating >= 2200) return '6 star';
    if (rating >= 2000) return '5 star';
    if (rating >= 1800) return '4 star';
    if (rating >= 1600) return '3 star';
    if (rating >= 1400) return '2 star';
    return '1 star';
}
