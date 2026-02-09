// Codeforces-specific TypeScript types

export interface CodeforcesUser {
    handle: string;
    rating?: number;
    rank?: string;
    maxRating?: number;
    maxRank?: string;
    contribution?: number;
    friendOfCount?: number;
    avatar?: string;
    titlePhoto?: string;
    lastOnlineTimeSeconds?: number;
    registrationTimeSeconds?: number;
}

export interface CodeforcesRatingResponse {
    username: string;
    platform: string;
    rating: number | string;
    level: string;
    max_rating?: number | string;
    max_level?: string;
    contribution?: number;
    friendOfCount?: number;
    avatar?: string;
}

export interface CodeforcesContestHistory {
    contestId: number;
    contestName: string;
    handle: string;
    rank: number;
    ratingUpdateTimeSeconds: number;
    oldRating: number;
    newRating: number;
}

export interface CodeforcesProblem {
    contestId: number;
    index: string;
    name: string;
    rating?: number;
    tags: string[];
}

export interface CodeforcesSubmission {
    id: number;
    contestId?: number;
    problem: CodeforcesProblem;
    verdict: string;
    programmingLanguage: string;
    creationTimeSeconds: number;
}

export interface SolvedProblem {
    id: string;
    name: string;
    rating?: number;
    tags: string[];
    link: string;
}

export interface BlogEntry {
    id: number;
    title: string;
    creationTimeSeconds: number;
    rating: number;
}

export interface UserQuery {
    username: string;
}

export interface StatusQuery {
    username: string;
    from?: number;
    count?: number;
}

export interface CodeforcesContest {
    id: number;
    name: string;
    type: string;
    phase: string;
    frozen: boolean;
    durationSeconds: number;
    startTimeSeconds?: number;
    relativeTimeSeconds?: number;
}

export interface RecentAction {
    timeSeconds: number;
    blogEntry?: BlogEntry;
    comment?: {
        id: number;
        creationTimeSeconds: number;
        commentatorHandle: string;
        text: string;
    };
}

export interface RankingRow {
    party: any;
    rank: number;
    points: number;
    penalty: number;
    successfulHackCount: number;
    unsuccessfulHackCount: number;
    problemResults: any[];
}

export interface ContestStandings {
    contest: CodeforcesContest;
    problems: CodeforcesProblem[];
    rows: RankingRow[];
}

export interface RatingChange {
    contestId: number;
    contestName: string;
    handle: string;
    rank: number;
    ratingUpdateTimeSeconds: number;
    oldRating: number;
    newRating: number;
}

export interface Hack {
    id: number;
    creationTimeSeconds: number;
    hacker: any;
    defender: any;
    verdict?: string;
    problem: CodeforcesProblem;
}

export interface ProblemsetQuery {
    tags?: string;
}

export interface RecentActionsQuery {
    maxCount: number;
}

export interface ContestQuery {
    contestId: number;
}

export interface StandingsQuery {
    contestId: number;
    from?: number;
    count?: number;
    handles?: string;
    room?: number;
    showUnofficial?: boolean;
}

export interface ContestStatusQuery {
    contestId: number;
    handle?: string;
    from?: number;
    count?: number;
}

export interface BlogEntryQuery {
    blogEntryId: number;
}

export interface RecentStatusQuery {
    count: number;
}

export interface BlogEntryView {
    id: number;
    title: string;
    content: string;
    creationTimeSeconds: number;
    rating: number;
    authorHandle: string;
}

export interface BlogComment {
    id: number;
    creationTimeSeconds: number;
    commentatorHandle: string;
    text: string;
    rating: number;
}
