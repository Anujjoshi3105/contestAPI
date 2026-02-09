export function mapRating(rating: number): string {
    if (rating >= 2800) return 'Red';
    if (rating >= 2400) return 'Orange';
    if (rating >= 2000) return 'Yellow';
    if (rating >= 1600) return 'Blue';
    if (rating >= 1200) return 'Cyan';
    if (rating >= 800) return 'Green';
    if (rating >= 400) return 'Brown';
    return 'Gray';
}

export const ATCODER_BASE_URL = 'https://atcoder.jp';

export const ATCODER_SELECTORS = {
    AVATAR: '.avatar',
    USERNAME: '.username',
    KYU: 'h3 b',
} as const;

export const ATCODER_LABELS = {
    RATING: 'Rating',
    MAX_RATING: 'Highest Rating',
    RANK: 'Rank',
    RATED_MATCHES: 'Rated Matches',
    LAST_COMPETED: 'Last Competed',
    COUNTRY: 'Country/Region',
    BIRTH_YEAR: 'Birth Year',
} as const;
