import { httpClient } from '../../shared/utils/http-client';
import * as cheerio from 'cheerio';
import { CodeChefUserRating } from './types';
import { CODECHEF_BASE_URL, CODECHEF_SELECTORS } from './constants';

export async function fetchUserRating(username: string): Promise<CodeChefUserRating> {
    const url = `${CODECHEF_BASE_URL}${username}`;
    try {
        const { data } = await httpClient.get(url);
        const $ = cheerio.load(data);

        // Check if user exists on page (CodeChef usually shows a specific page for missing users or 404s)
        if ($('body').text().includes('not found') || $('title').text().includes('404')) {
            throw new Error(`User '${username}' not found on CodeChef`);
        }

        const ratingElement = $(CODECHEF_SELECTORS.RATING).first();
        if (ratingElement.length === 0) {
            throw new Error('CodeChef schema change detected: Rating selector not found');
        }

        const ratingText = ratingElement.text().trim();
        const rating = parseInt(ratingText);

        const maxRatingElement = $(CODECHEF_SELECTORS.MAX_RATING).first();
        const maxRatingText = maxRatingElement.text().match(/\d+/)?.[0];
        const max_rating = maxRatingText ? parseInt(maxRatingText) : undefined;

        if (isNaN(rating)) {
            throw new Error('Could not parse CodeChef rating. Schema might have changed.');
        }

        return { rating, max_rating };
    } catch (error: any) {
        if (error.response?.status === 404) {
            throw new Error(`User '${username}' not found on CodeChef`);
        }
        throw error;
    }
}
