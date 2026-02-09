import { httpClient } from '../../shared/utils/http-client';
import type {
    CodeforcesUser,
    CodeforcesContestHistory,
    CodeforcesSubmission,
    BlogEntry,
    CodeforcesContest,
    RecentAction,
    CodeforcesProblem,
    ContestStandings,
    RatingChange,
    Hack,
    BlogEntryView,
    BlogComment,
} from './types';

const CODEFORCES_API_BASE = 'https://codeforces.com/api';

// Fetch user information
export async function fetchUserInfo(username: string): Promise<CodeforcesUser> {
    const url = `${CODEFORCES_API_BASE}/user.info?handles=${username}`;
    const { data } = await httpClient.get(url);

    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching user info');
    }

    return data.result[0];
}

// Fetch user's contest rating history
export async function fetchContestHistory(
    username: string
): Promise<CodeforcesContestHistory[]> {
    const url = `${CODEFORCES_API_BASE}/user.rating?handle=${username}`;
    const { data } = await httpClient.get(url);

    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching contest history');
    }

    return data.result;
}

const MAX_CF_LIMIT = 1000;

// Fetch user's submission status
export async function fetchUserStatus(
    username: string,
    from: number = 1,
    count: number = 10
): Promise<CodeforcesSubmission[]> {
    const safeCount = Math.min(count, MAX_CF_LIMIT);
    const url = `${CODEFORCES_API_BASE}/user.status?handle=${username}&from=${from}&count=${safeCount}`;
    const { data } = await httpClient.get(url);

    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching user status');
    }

    return data.result;
}

// Fetch user's blog entries
export async function fetchBlogEntries(username: string): Promise<BlogEntry[]> {
    const url = `${CODEFORCES_API_BASE}/user.blogEntries?handle=${username}`;
    const { data } = await httpClient.get(url);

    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching blog entries');
    }

    return data.result;
}

// Fetch user submissions with limit
export async function fetchAllSubmissions(
    username: string,
    from: number = 1,
    count: number = 100
): Promise<CodeforcesSubmission[]> {
    const safeCount = Math.min(count, MAX_CF_LIMIT);
    const url = `${CODEFORCES_API_BASE}/user.status?handle=${username}&from=${from}&count=${safeCount}`;
    const { data } = await httpClient.get(url);

    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching submissions');
    }

    return data.result;
}

// Fetch contests
export async function fetchContests(gym: boolean = false): Promise<CodeforcesContest[]> {
    const url = `${CODEFORCES_API_BASE}/contest.list?gym=${gym}`;
    const { data } = await httpClient.get(url);

    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching contest list');
    }

    return data.result;
}

// Fetch recent actions
export async function fetchRecentActions(maxCount: number = 20): Promise<RecentAction[]> {
    const url = `${CODEFORCES_API_BASE}/recentActions?maxCount=${maxCount}`;
    const { data } = await httpClient.get(url);

    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching recent actions');
    }

    return data.result;
}

// Fetch problemset problems
export async function fetchProblems(tags?: string): Promise<{ problems: CodeforcesProblem[] }> {
    const url = tags
        ? `${CODEFORCES_API_BASE}/problemset.problems?tags=${tags}`
        : `${CODEFORCES_API_BASE}/problemset.problems`;
    const { data } = await httpClient.get(url);

    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching problemset');
    }

    return data.result;
}

// Fetch contest standings
export async function fetchContestStandings(
    contestId: number,
    from?: number,
    count?: number,
    handles?: string,
    room?: number,
    showUnofficial?: boolean
): Promise<ContestStandings> {
    let url = `${CODEFORCES_API_BASE}/contest.standings?contestId=${contestId}`;
    if (from) url += `&from=${from}`;
    if (count) url += `&count=${count}`;
    if (handles) url += `&handles=${handles}`;
    if (room) url += `&room=${room}`;
    if (showUnofficial !== undefined) url += `&showUnofficial=${showUnofficial}`;

    const { data } = await httpClient.get(url);
    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching contest standings');
    }
    return data.result;
}

// Fetch contest rating changes
export async function fetchContestRatingChanges(contestId: number): Promise<RatingChange[]> {
    const url = `${CODEFORCES_API_BASE}/contest.ratingChanges?contestId=${contestId}`;
    const { data } = await httpClient.get(url);
    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching rating changes');
    }
    return data.result;
}

// Fetch contest hacks
export async function fetchContestHacks(contestId: number): Promise<Hack[]> {
    const url = `${CODEFORCES_API_BASE}/contest.hacks?contestId=${contestId}`;
    const { data } = await httpClient.get(url);
    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching contest hacks');
    }
    return data.result;
}

// Fetch contest status (submissions)
export async function fetchContestStatus(
    contestId: number,
    handle?: string,
    from?: number,
    count?: number
): Promise<CodeforcesSubmission[]> {
    let url = `${CODEFORCES_API_BASE}/contest.status?contestId=${contestId}`;
    if (handle) url += `&handle=${handle}`;
    if (from) url += `&from=${from}`;
    if (count) url += `&count=${count}`;

    const { data } = await httpClient.get(url);
    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching contest status');
    }
    return data.result;
}

// Fetch problemset recent status
export async function fetchProblemsetRecentStatus(count: number): Promise<CodeforcesSubmission[]> {
    const url = `${CODEFORCES_API_BASE}/problemset.recentStatus?count=${count}`;
    const { data } = await httpClient.get(url);
    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching recent status');
    }
    return data.result;
}

// Fetch blog entry content
export async function fetchBlogEntry(blogEntryId: number): Promise<BlogEntryView> {
    const url = `${CODEFORCES_API_BASE}/blogEntry.view?blogEntryId=${blogEntryId}`;
    const { data } = await httpClient.get(url);
    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching blog entry');
    }
    return data.result;
}

// Fetch blog entry comments
export async function fetchBlogComments(blogEntryId: number): Promise<BlogComment[]> {
    const url = `${CODEFORCES_API_BASE}/blogEntry.comments?blogEntryId=${blogEntryId}`;
    const { data } = await httpClient.get(url);
    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Error fetching blog comments');
    }
    return data.result;
}
