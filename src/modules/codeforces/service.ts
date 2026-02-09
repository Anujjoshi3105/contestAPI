import * as provider from './provider';
import type {
    CodeforcesRatingResponse,
    CodeforcesContestHistory,
    CodeforcesSubmission,
    SolvedProblem,
    BlogEntry,
    CodeforcesContest,
    RecentAction,
    CodeforcesProblem,
    ContestStandings,
    RatingChange,
    Hack,
} from './types';

// Get user's rating
export async function getUserRating(username: string): Promise<CodeforcesRatingResponse> {
    try {
        const user = await provider.fetchUserInfo(username);

        return {
            username,
            platform: 'codeforces',
            rating: user.rating || 'Unrated',
            level: user.rank || 'Unrated',
            max_rating: user.maxRating || 'Unrated',
            max_level: user.maxRank || 'Unrated',
            contribution: user.contribution,
            friendOfCount: user.friendOfCount,
            avatar: user.avatar,
        };
    } catch (error: any) {
        console.error(`Codeforces Error for ${username}:`, error.message);
        throw new Error('Error fetching Codeforces rating');
    }
}

// Get user's contest history
export async function getContestHistory(
    username: string
): Promise<CodeforcesContestHistory[]> {
    try {
        return await provider.fetchContestHistory(username);
    } catch (error: any) {
        console.error(`Codeforces Error for ${username}:`, error.message);
        throw new Error('Error fetching Codeforces contest history');
    }
}

// Get user's submission status
export async function getUserStatus(
    username: string,
    from: number = 1,
    count: number = 10
): Promise<CodeforcesSubmission[]> {
    try {
        return await provider.fetchUserStatus(username, from, count);
    } catch (error: any) {
        console.error(`Codeforces Error for ${username}:`, error.message);
        throw new Error('Error fetching Codeforces user status');
    }
}

// Get user's blog entries
export async function getUserBlogs(username: string): Promise<BlogEntry[]> {
    try {
        return await provider.fetchBlogEntries(username);
    } catch (error: any) {
        console.error(`Codeforces Error for ${username}:`, error.message);
        throw new Error('Error fetching Codeforces user blog entries');
    }
}

// Get user's solved problems
export async function getSolvedProblems(username: string): Promise<SolvedProblem[]> {
    try {
        const submissions = await provider.fetchAllSubmissions(username, 1, 1000);

        const solvedProblemsSet = new Set<string>();
        const solvedProblems: SolvedProblem[] = [];

        submissions.forEach((submission) => {
            if (submission.verdict === 'OK') {
                const problemId = `${submission.problem.contestId}${submission.problem.index}`;

                if (!solvedProblemsSet.has(problemId)) {
                    solvedProblemsSet.add(problemId);
                    solvedProblems.push({
                        id: problemId,
                        name: submission.problem.name,
                        rating: submission.problem.rating,
                        tags: submission.problem.tags,
                        link: `https://codeforces.com/contest/${submission.problem.contestId}/problem/${submission.problem.index}`,
                    });
                }
            }
        });

        return solvedProblems;
    } catch (error: any) {
        console.error(`Codeforces Error for ${username}:`, error.message);
        throw new Error('Error fetching Codeforces solved problems');
    }
}

// Get contests
export async function getContests(gym: boolean = false): Promise<CodeforcesContest[]> {
    try {
        return await provider.fetchContests(gym);
    } catch (error: any) {
        console.error('Codeforces Error:', error.message);
        throw new Error('Error fetching Codeforces contests');
    }
}

// Get recent actions
export async function getRecentActions(maxCount: number = 20): Promise<RecentAction[]> {
    try {
        return await provider.fetchRecentActions(maxCount);
    } catch (error: any) {
        console.error('Codeforces Error:', error.message);
        throw new Error('Error fetching Codeforces recent actions');
    }
}

// Get problemset problems
export async function getProblems(tags?: string): Promise<CodeforcesProblem[]> {
    try {
        const result = await provider.fetchProblems(tags);
        return result.problems;
    } catch (error: any) {
        console.error('Codeforces Error:', error.message);
        throw new Error('Error fetching Codeforces problemset');
    }
}

// Get contest standings
export async function getContestStandings(
    contestId: number,
    from?: number,
    count?: number,
    handles?: string,
    room?: number,
    showUnofficial?: boolean
): Promise<ContestStandings> {
    try {
        return await provider.fetchContestStandings(contestId, from, count, handles, room, showUnofficial);
    } catch (error: any) {
        console.error('Codeforces Error:', error.message);
        throw new Error('Error fetching Codeforces contest standings');
    }
}

// Get rating changes
export async function getContestRatingChanges(contestId: number): Promise<RatingChange[]> {
    try {
        return await provider.fetchContestRatingChanges(contestId);
    } catch (error: any) {
        console.error('Codeforces Error:', error.message);
        throw new Error('Error fetching Codeforces contest rating changes');
    }
}

// Get contest hacks
export async function getContestHacks(contestId: number): Promise<Hack[]> {
    try {
        return await provider.fetchContestHacks(contestId);
    } catch (error: any) {
        console.error('Codeforces Error:', error.message);
        throw new Error('Error fetching Codeforces contest hacks');
    }
}

// Get contest status
export async function getContestStatus(
    contestId: number,
    handle?: string,
    from?: number,
    count?: number
): Promise<CodeforcesSubmission[]> {
    try {
        return await provider.fetchContestStatus(contestId, handle, from, count);
    } catch (error: any) {
        console.error('Codeforces Error:', error.message);
        throw new Error('Error fetching Codeforces contest status');
    }
}

// Get problemset recent status
export async function getProblemsetRecentStatus(count: number): Promise<CodeforcesSubmission[]> {
    try {
        return await provider.fetchProblemsetRecentStatus(count);
    } catch (error: any) {
        console.error('Codeforces Error:', error.message);
        throw new Error('Error fetching Codeforces problemset recent status');
    }
}

// Get blog entry
export async function getBlogEntry(blogEntryId: number): Promise<any> {
    try {
        return await provider.fetchBlogEntry(blogEntryId);
    } catch (error: any) {
        console.error('Codeforces Error:', error.message);
        throw new Error('Error fetching Codeforces blog entry');
    }
}

// Get blog comments
export async function getBlogComments(blogEntryId: number): Promise<any[]> {
    try {
        return await provider.fetchBlogComments(blogEntryId);
    } catch (error: any) {
        console.error('Codeforces Error:', error.message);
        throw new Error('Error fetching Codeforces blog comments');
    }
}
