import { mapRating } from './constants';
import * as provider from './provider';
import type { AtCoderRating, UserHistory, ContestStandings } from './types';

export async function getUserRating(username: string): Promise<AtCoderRating> {
    try {
        const data = await provider.fetchUserRating(username);
        return {
            username,
            display_name: data.display_name,
            platform: 'atcoder',
            rating: data.rating,
            max_rating: data.max_rating,
            level: mapRating(data.rating),
            rank: data.rank,
            contests_participated: data.contests_participated,
            last_competed: data.last_competed,
            kyu: data.kyu,
            country: data.country,
            birth_year: data.birth_year,
            avatar: data.avatar,
        };
    } catch (error: any) {
        console.error(`AtCoder Error for ${username}:`, error.message);
        throw new Error('Failed to fetch AtCoder user data');
    }
}

export async function getUserHistory(username: string): Promise<UserHistory[]> {
    try {
        return await provider.fetchUserHistory(username);
    } catch (error: any) {
        console.error(`AtCoder History Error for ${username}:`, error.message);
        throw new Error('Failed to fetch AtCoder user history');
    }
}

export async function getContestStandings(contestId: string, extended: boolean = false): Promise<ContestStandings> {
    try {
        return await provider.fetchContestStandings(contestId, extended);
    } catch (error: any) {
        console.error(`AtCoder Standings Error for ${contestId}:`, error.message);
        throw new Error('Failed to fetch AtCoder contest standings');
    }
}

export async function getContestResults(contestId: string): Promise<any> {
    try {
        return await provider.fetchContestResults(contestId);
    } catch (error: any) {
        console.error(`AtCoder Results Error for ${contestId}:`, error.message);
        throw new Error('Failed to fetch AtCoder contest results');
    }
}

export async function getVirtualStandings(contestId: string, showGhost: boolean = true): Promise<any> {
    try {
        return await provider.fetchVirtualStandings(contestId, showGhost);
    } catch (error: any) {
        console.error(`AtCoder Virtual Standings Error for ${contestId}:`, error.message);
        throw new Error('Failed to fetch AtCoder virtual standings');
    }
}
