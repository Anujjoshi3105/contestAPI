import { mapRating } from './constants';
import * as provider from './provider';
import type { CodeChefRating } from './types';

export async function getUserRating(username: string): Promise<CodeChefRating> {
    try {
        const data = await provider.fetchUserRating(username);

        return {
            username,
            platform: 'codechef',
            rating: data.rating,
            level: mapRating(data.rating),
            max_rating: data.max_rating,
        };
    } catch (error: any) {
        console.error(`CodeChef Error for ${username}:`, error.message);
        throw new Error('Error fetching CodeChef rating');
    }
}
