import * as provider from '../provider';
import * as formatters from '../utils/formatters';
import {
    UserRatingResponse,
    UserProfileResponse,
    UserData,
} from '../types';

export async function getUserRating(username: string): Promise<UserRatingResponse> {
    try {
        const data = await provider.fetchUserRating(username);
        if (!data || !data.userContestRanking) {
            throw new Error('User not found or no contest data');
        }
        return formatters.formatUserRating(data, username);
    } catch (error: any) {
        console.error(`LeetCode Error for ${username}:`, error.message);
        throw new Error(error.message || 'Error fetching LeetCode rating');
    }
}

export async function getUserProfile(username: string): Promise<any> {
    try {
        const data = await provider.fetchUserProfile(username);
        return formatters.formatUserProfileData(data);
    } catch (error: any) {
        console.error('LeetCode User Profile Error:', error.message);
        throw new Error('Error fetching LeetCode user profile');
    }
}

export async function getUserDetails(username: string): Promise<any> {
    try {
        const data = await provider.fetchUserData(username);
        return formatters.formatUserData(data);
    } catch (error: any) {
        console.error('LeetCode User Details Error:', error.message);
        throw new Error('Error fetching LeetCode user details');
    }
}

export async function getUserBadges(username: string): Promise<any> {
    try {
        const data = await provider.fetchUserBadges(username);
        return formatters.formatBadgesData(data);
    } catch (error: any) {
        throw new Error('Error fetching LeetCode user badges');
    }
}

export async function getUserSolved(username: string): Promise<any> {
    try {
        const data = await provider.fetchUserSolved(username);
        return formatters.formatSolvedProblemsData(data);
    } catch (error: any) {
        throw new Error('Error fetching LeetCode user solved problems');
    }
}

export async function getUserContest(username: string): Promise<any> {
    try {
        const data = await provider.fetchContestData(username);
        return formatters.formatContestData(data);
    } catch (error: any) {
        throw new Error('Error fetching LeetCode user contest details');
    }
}

export async function getUserContestHistory(username: string): Promise<any> {
    try {
        const data = await provider.fetchUserContestRanking(username);
        return {
            count: data.userContestRankingHistory.length,
            contestHistory: data.userContestRankingHistory,
        };
    } catch (error: any) {
        throw new Error('Error fetching LeetCode user contest history');
    }
}

export async function getUserSubmission(username: string, limit: number): Promise<any> {
    try {
        const data = await provider.fetchSubmissions(username, limit);
        return {
            count: data.recentSubmissionList.length,
            submission: data.recentSubmissionList,
        };
    } catch (error: any) {
        throw new Error('Error fetching LeetCode user submissions');
    }
}

export async function getUserAcSubmission(username: string, limit: number): Promise<any> {
    try {
        const data = await provider.fetchAcSubmissions(username, limit);
        return {
            count: data.recentAcSubmissionList.length,
            submission: data.recentAcSubmissionList,
        };
    } catch (error: any) {
        throw new Error('Error fetching LeetCode user AC submissions');
    }
}

export async function getUserCalendar(username: string, year: number): Promise<any> {
    try {
        const data = await provider.fetchUserCalendar(username, year);
        // Calendar formatting might be needed
        return data.matchedUser.userCalendar;
    } catch (error: any) {
        throw new Error('Error fetching LeetCode user calendar');
    }
}

export async function getUserSkill(username: string): Promise<any> {
    try {
        const data = await provider.fetchSkillStats(username);
        return formatters.formatSkillStats({ matchedUser: data.matchedUser } as any);
    } catch (error: any) {
        throw new Error('Error fetching LeetCode user skills');
    }
}

export async function getUserLanguage(username: string): Promise<any> {
    try {
        const data = await provider.fetchLanguageStats(username);
        return formatters.formatLanguageStats({ matchedUser: data.matchedUser } as any);
    } catch (error: any) {
        throw new Error('Error fetching LeetCode user languages');
    }
}

export async function getUserProgress(username: string): Promise<any> {
    try {
        const data = await provider.fetchUserQuestionProgress(username);
        return {
            numAcceptedQuestions: data.userProfileUserQuestionProgressV2,
        };
    } catch (error: any) {
        throw new Error('Error fetching LeetCode user progress');
    }
}
