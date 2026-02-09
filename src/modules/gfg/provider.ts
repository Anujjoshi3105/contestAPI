import { httpClient } from '../../shared/utils/http-client';
import * as cheerio from 'cheerio';
import type {
    GFGSubmissionsResponse,
    SubmissionsQuery,
    UserPostsQuery,
    LeaderboardQuery,
    PromotionalEventsQuery,
    GFGUserRating,
    GFGPost,
    GFGPromotionalEvent,
    GFGLeaderboard,
} from './types';
import { GFG_BASE_URL, GFG_SELECTORS } from './constants';

export async function fetchUserRating(username: string): Promise<GFGUserRating> {
    const url = `${GFG_BASE_URL}${username}/`;
    try {
        const { data } = await httpClient.get(url);
        const $ = cheerio.load(data);

        // Check for 404 or "User not found"
        if ($('title').text().includes('404') || $('body').text().includes('User not found')) {
            throw new Error(`User '${username}' not found on GeeksforGeeks`);
        }

        const scriptContent = $(GFG_SELECTORS.NEXT_DATA).html();
        if (!scriptContent) {
            throw new Error('GeeksforGeeks schema change detected: NEXT_DATA script not found');
        }

        const jsonData = JSON.parse(scriptContent);
        const userData = jsonData?.props?.pageProps?.contestData?.user_contest_data;
        const stars = jsonData?.props?.pageProps?.contestData?.user_stars;

        if (!userData && !jsonData?.props?.pageProps?.contestData) {
            throw new Error(`User '${username}' contest data not found. Profile might be private or schema changed.`);
        }

        return {
            rating: userData?.current_rating || 'Unrated',
            stars: stars ? `${stars} star` : 'Unrated',
        };
    } catch (error: any) {
        if (error.response?.status === 404) {
            throw new Error(`User '${username}' not found on GeeksforGeeks`);
        }
        throw error;
    }
}

export async function fetchUserSubmissions(query: SubmissionsQuery): Promise<GFGSubmissionsResponse> {
    const url = 'https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/';
    const { data } = await httpClient.post(url, {
        handle: query.handle,
        requestType: query.requestType || "",
        year: query.year || "",
        month: query.month || ""
    });
    return data;
}

export async function fetchUserPosts(query: UserPostsQuery): Promise<GFGPost[]> {
    const url = `https://communityapi.geeksforgeeks.org/post/user/${query.username}/`;
    const { data } = await httpClient.get(url, {
        params: {
            fetch_type: query.fetch_type || 'posts',
            page: query.page || 1
        }
    });
    return data;
}

export async function fetchPromotionalEvents(query: PromotionalEventsQuery): Promise<GFGPromotionalEvent[]> {
    const url = 'https://practiceapi.geeksforgeeks.org/api/vr/events/promotional/';
    const { data } = await httpClient.get(url, {
        params: {
            page_source: query.page_source,
            user_country_code: query.user_country_code || 'IN'
        }
    });
    return data;
}

export async function fetchContestLeaderboard(query: LeaderboardQuery): Promise<GFGLeaderboard> {
    const url = 'https://practiceapi.geeksforgeeks.org/api/latest/events/recurring/gfg-weekly-coding-contest/leaderboard/';
    const { data } = await httpClient.get(url, {
        params: {
            leaderboard_type: query.leaderboard_type || 0,
            page: query.page || 1,
            year_month: query.year_month || ""
        }
    });
    return data;
}
