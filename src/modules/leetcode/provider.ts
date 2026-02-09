import { httpClient } from '../../shared/utils/http-client';
import {
    USER_CONTEST_RANKING_QUERY,
    USER_RATING_QUERY,
    CONTEST_HISTOGRAM_QUERY,
    ALL_CONTESTS_QUERY,
    DAILY_PROBLEM_QUERY,
    SELECT_PROBLEM_QUERY,
    PROBLEM_LIST_QUERY,
    OFFICIAL_SOLUTION_QUERY,
    TRENDING_DISCUSS_QUERY,
    DISCUSS_TOPIC_QUERY,
    DISCUSS_COMMENTS_QUERY,
    USER_PROFILE_QUERY,
    USER_PROFILE_CALENDAR_QUERY,
    USER_QUESTION_PROGRESS_QUERY,
    SKILL_STATS_QUERY,
    LANGUAGE_STATS_QUERY,
    AC_SUBMISSION_QUERY,
    SUBMISSION_QUERY,
    GET_USER_PROFILE_QUERY,
    CONTEST_QUERY,
    USER_BADGES_QUERY,
    USER_SOLVED_QUERY,
} from './utils/queries';
import type {
    ContestRankingResponse,
    ContestHistogramResponse,
    Contest,
    UserData,
    DailyProblemData,
    SelectProblemData,
    ProblemSetQuestionListData,
    UserProfileResponse,
    UserRatingData,
    OfficialSolutionData,
    TrendingDiscussData,
    DiscussTopicData,
    DiscussCommentsData,
    UserCalendarData,
    UserQuestionProgressData,
    SkillStatsData,
    LanguageStatsData,
    AcSubmissionsData,
    SubmissionsData,
    ContestData,
} from './types';

import { LEETCODE_API_URL, LEETCODE_HEADERS } from './constants';

async function leetcodeRequest<T>(query: string, variables: object = {}): Promise<T> {
    const payload = { query, variables };
    const response = await httpClient.post(LEETCODE_API_URL, payload, {
        headers: LEETCODE_HEADERS,
    });

    if (response.status !== 200) {
        throw new Error(`LeetCode API returned status ${response.status}`);
    }

    if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
}

// Existing functions
export async function fetchUserContestRanking(username: string): Promise<ContestRankingResponse> {
    return await leetcodeRequest<ContestRankingResponse>(USER_CONTEST_RANKING_QUERY, { username });
}

export async function fetchUserRating(username: string): Promise<UserRatingData> {
    return await leetcodeRequest<UserRatingData>(USER_RATING_QUERY, { username });
}

export async function fetchContestHistogram(): Promise<ContestHistogramResponse> {
    return await leetcodeRequest<ContestHistogramResponse>(CONTEST_HISTOGRAM_QUERY);
}

export async function fetchAllContests(): Promise<Contest[]> {
    const data = await leetcodeRequest<{ allContests: Contest[] }>(ALL_CONTESTS_QUERY);
    return data.allContests;
}

export async function fetchDailyProblem(): Promise<DailyProblemData> {
    return await leetcodeRequest<DailyProblemData>(DAILY_PROBLEM_QUERY);
}

export async function fetchSelectProblem(titleSlug: string): Promise<SelectProblemData> {
    return await leetcodeRequest<SelectProblemData>(SELECT_PROBLEM_QUERY, { titleSlug });
}

const MAX_LEETCODE_LIMIT = 100;

export async function fetchProblems(filters: {
    categorySlug?: string;
    limit?: number;
    skip?: number;
    filters?: any;
}): Promise<ProblemSetQuestionListData> {
    const { categorySlug, limit = 20, skip = 0, filters: questionFilters } = filters;
    const safeLimit = Math.min(limit, MAX_LEETCODE_LIMIT);

    return await leetcodeRequest<ProblemSetQuestionListData>(PROBLEM_LIST_QUERY, {
        categorySlug,
        limit: safeLimit,
        skip,
        filters: questionFilters,
    });
}

export async function fetchOfficialSolution(titleSlug: string): Promise<OfficialSolutionData> {
    return await leetcodeRequest<OfficialSolutionData>(OFFICIAL_SOLUTION_QUERY, { titleSlug });
}

export async function fetchTrendingDiscuss(first: number): Promise<TrendingDiscussData> {
    return await leetcodeRequest<TrendingDiscussData>(TRENDING_DISCUSS_QUERY, { first });
}

export async function fetchDiscussTopic(topicId: number): Promise<DiscussTopicData> {
    return await leetcodeRequest<DiscussTopicData>(DISCUSS_TOPIC_QUERY, { topicId });
}

export async function fetchDiscussComments(params: {
    topicId: number;
    orderBy?: string;
    pageNo?: number;
    numPerPage?: number;
}): Promise<DiscussCommentsData> {
    return await leetcodeRequest<DiscussCommentsData>(DISCUSS_COMMENTS_QUERY, params);
}

export async function fetchUserProfile(username: string): Promise<UserProfileResponse> {
    return await leetcodeRequest<UserProfileResponse>(GET_USER_PROFILE_QUERY, { username });
}

export async function fetchUserData(username: string): Promise<UserData> {
    // This query is very large and might need optimization or splitting
    return await leetcodeRequest<UserData>(USER_PROFILE_QUERY, { username });
}

export async function fetchUserCalendar(username: string, year: number): Promise<UserCalendarData> {
    return await leetcodeRequest<UserCalendarData>(USER_PROFILE_CALENDAR_QUERY, { username, year });
}

export async function fetchUserQuestionProgress(username: string): Promise<UserQuestionProgressData> {
    return await leetcodeRequest<UserQuestionProgressData>(USER_QUESTION_PROGRESS_QUERY, { username });
}

export async function fetchSkillStats(username: string): Promise<SkillStatsData> {
    return await leetcodeRequest<SkillStatsData>(SKILL_STATS_QUERY, { username });
}

export async function fetchLanguageStats(username: string): Promise<LanguageStatsData> {
    return await leetcodeRequest<LanguageStatsData>(LANGUAGE_STATS_QUERY, { username });
}

export async function fetchAcSubmissions(username: string, limit: number): Promise<AcSubmissionsData> {
    return await leetcodeRequest<AcSubmissionsData>(AC_SUBMISSION_QUERY, { username, limit });
}

export async function fetchSubmissions(username: string, limit: number): Promise<SubmissionsData> {
    return await leetcodeRequest<SubmissionsData>(SUBMISSION_QUERY, { username, limit });
}

export async function fetchContestData(username: string): Promise<ContestData> {
    return await leetcodeRequest<ContestData>(CONTEST_QUERY, { username });
}

export async function fetchUserBadges(username: string): Promise<any> {
    return await leetcodeRequest<any>(USER_BADGES_QUERY, { username });
}

export async function fetchUserSolved(username: string): Promise<any> {
    return await leetcodeRequest<any>(USER_SOLVED_QUERY, { username });
}
