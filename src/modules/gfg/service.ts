import * as provider from './provider';
import type {
    GFGRating,
    SubmissionsQuery,
    GFGSubmissionsResponse,
    UserPostsQuery,
    LeaderboardQuery,
    PromotionalEventsQuery
} from './types';

export async function getUserRating(username: string): Promise<GFGRating> {
    try {
        const data = await provider.fetchUserRating(username);

        return {
            username,
            platform: 'gfg',
            rating: data.rating,
            level: data.stars,
        };
    } catch (error: any) {
        console.error(`GFG Error for ${username}:`, error.message);
        throw new Error('Error fetching GFG user data');
    }
}

export async function getUserSubmissions(query: SubmissionsQuery): Promise<GFGSubmissionsResponse> {
    try {
        return await provider.fetchUserSubmissions(query);
    } catch (error: any) {
        console.error(`GFG Submissions Error for ${query.handle}:`, error.message);
        throw new Error('Error fetching GFG submissions');
    }
}

export async function getUserPosts(query: UserPostsQuery): Promise<any> {
    try {
        return await provider.fetchUserPosts(query);
    } catch (error: any) {
        console.error(`GFG Posts Error for ${query.username}:`, error.message);
        throw new Error('Error fetching GFG user posts');
    }
}

export async function getPromotionalEvents(query: PromotionalEventsQuery): Promise<any> {
    try {
        return await provider.fetchPromotionalEvents(query);
    } catch (error: any) {
        console.error('GFG Promotional Events Error:', error.message);
        throw new Error('Error fetching GFG promotional events');
    }
}

export async function getContestLeaderboard(query: LeaderboardQuery): Promise<any> {
    try {
        return await provider.fetchContestLeaderboard(query);
    } catch (error: any) {
        console.error('GFG Leaderboard Error:', error.message);
        throw new Error('Error fetching GFG contest leaderboard');
    }
}
