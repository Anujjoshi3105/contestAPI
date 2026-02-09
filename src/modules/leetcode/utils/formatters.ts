import {
    ContestRankingResponse,
    UserRatingResponse,
    UserData,
    DailyProblemData,
    SelectProblemData,
    ProblemSetQuestionListData,
    UserProfileResponse,
} from '../types';

export function formatUserRating(data: any, username: string): UserRatingResponse {
    if (!data || !data.userContestRanking) {
        throw new Error('User not found or no contest data');
    }

    const ranking = data.userContestRanking;
    const rating = Math.round(ranking.rating);
    const level = ranking.badge?.name;


    return {
        username,
        platform: 'leetcode',
        rating,
        contests_participated: ranking.attendedContestsCount,
        level,
        rank: ranking.globalRanking,
        top_percentage: ranking.topPercentage,
    };
}

export function formatContestRanking(data: any): ContestRankingResponse {
    return {
        userContestRanking: data.userContestRanking,
        userContestRankingHistory: data.userContestRankingHistory || [],
    };
}

export const formatUserData = (data: UserData) => ({
    username: data.matchedUser.username,
    name: data.matchedUser.profile.realName,
    birthday: data.matchedUser.profile.birthday,
    avatar: data.matchedUser.profile.userAvatar,
    ranking: data.matchedUser.profile.ranking,
    reputation: data.matchedUser.profile.reputation,
    gitHub: data.matchedUser.githubUrl,
    twitter: data.matchedUser.twitterUrl,
    linkedIN: data.matchedUser.linkedinUrl,
    website: data.matchedUser.profile.websites,
    country: data.matchedUser.profile.countryName,
    company: data.matchedUser.profile.company,
    school: data.matchedUser.profile.school,
    skillTags: data.matchedUser.profile.skillTags,
    about: data.matchedUser.profile.aboutMe,
});

export const formatBadgesData = (data: UserData) => ({
    badgesCount: data.matchedUser.badges.length,
    badges: data.matchedUser.badges,
    upcomingBadges: data.matchedUser.upcomingBadges,
    activeBadge: data.matchedUser.activeBadge,
});

export const formatSolvedProblemsData = (data: UserData) => ({
    solvedProblem: data.matchedUser.submitStats.acSubmissionNum[0].count,
    easySolved: data.matchedUser.submitStats.acSubmissionNum[1].count,
    mediumSolved: data.matchedUser.submitStats.acSubmissionNum[2].count,
    hardSolved: data.matchedUser.submitStats.acSubmissionNum[3].count,
    totalSubmissionNum: data.matchedUser.submitStats.totalSubmissionNum,
    acSubmissionNum: data.matchedUser.submitStats.acSubmissionNum,
});

export const formatSubmissionData = (data: UserData) => ({
    count: data.recentSubmissionList.length,
    submission: data.recentSubmissionList,
});

export const formatAcSubmissionData = (data: UserData) => ({
    count: data.recentAcSubmissionList.length,
    submission: data.recentAcSubmissionList,
});

export const formatSubmissionCalendarData = (data: UserData) => ({
    activeYears: data.matchedUser.userCalendar.activeYears,
    streak: data.matchedUser.userCalendar.streak,
    totalActiveDays: data.matchedUser.userCalendar.totalActiveDays,
    dccBadges: data.matchedUser.userCalendar.dccBadge,
    submissionCalendar: data.matchedUser.userCalendar.submissionCalendar,
});

export const formatSkillStats = (data: UserData) => ({
    fundamental: data.matchedUser.tagProblemCounts.fundamental,
    intermediate: data.matchedUser.tagProblemCounts.intermediate,
    advanced: data.matchedUser.tagProblemCounts.advanced,
});

export const formatLanguageStats = (data: UserData) => ({
    languageProblemCount: data.matchedUser.languageProblemCount,
});

export const formatProgressStats = (data: UserData) => ({
    numAcceptedQuestions: data.userProfileUserQuestionProgressV2,
});

export const formatUserProfileData = (data: UserProfileResponse) => {
    return {
        totalSolved: data.matchedUser.submitStats.acSubmissionNum[0].count,
        totalSubmissions: data.matchedUser.submitStats.totalSubmissionNum,
        totalQuestions: data.allQuestionsCount[0].count,
        easySolved: data.matchedUser.submitStats.acSubmissionNum[1].count,
        totalEasy: data.allQuestionsCount[1].count,
        mediumSolved: data.matchedUser.submitStats.acSubmissionNum[2].count,
        totalMedium: data.allQuestionsCount[2].count,
        hardSolved: data.matchedUser.submitStats.acSubmissionNum[3].count,
        totalHard: data.allQuestionsCount[3].count,
        ranking: data.matchedUser.profile.ranking,
        contributionPoint: data.matchedUser.contributions.points,
        reputation: data.matchedUser.profile.reputation,
        submissionCalendar: JSON.parse(data.matchedUser.submissionCalendar),
        recentSubmissions: data.recentSubmissionList,
        matchedUserStats: data.matchedUser.submitStats,
    };
};

export const formatDailyData = (data: DailyProblemData) => ({
    questionLink: `https://leetcode.com${data.activeDailyCodingChallengeQuestion.link}`,
    date: data.activeDailyCodingChallengeQuestion.date,
    questionId: data.activeDailyCodingChallengeQuestion.question.questionId,
    questionFrontendId:
        data.activeDailyCodingChallengeQuestion.question.questionFrontendId,
    questionTitle: data.activeDailyCodingChallengeQuestion.question.title,
    titleSlug: data.activeDailyCodingChallengeQuestion.question.titleSlug,
    difficulty: data.activeDailyCodingChallengeQuestion.question.difficulty,
    isPaidOnly: data.activeDailyCodingChallengeQuestion.question.isPaidOnly,
    question: data.activeDailyCodingChallengeQuestion.question.content,
    exampleTestcases:
        data.activeDailyCodingChallengeQuestion.question.exampleTestcases,
    topicTags: data.activeDailyCodingChallengeQuestion.question.topicTags,
    hints: data.activeDailyCodingChallengeQuestion.question.hints,
    solution: data.activeDailyCodingChallengeQuestion.question.solution,
    companyTagStats:
        data.activeDailyCodingChallengeQuestion.question.companyTagStats,
    likes: data.activeDailyCodingChallengeQuestion.question.likes,
    dislikes: data.activeDailyCodingChallengeQuestion.question.dislikes,
    similarQuestions:
        data.activeDailyCodingChallengeQuestion.question.similarQuestions,
});

export const formatQuestionData = (data: SelectProblemData) => ({
    link: `https://leetcode.com/problems/${data.question.titleSlug}`,
    questionId: data.question.questionId,
    questionFrontendId: data.question.questionFrontendId,
    questionTitle: data.question.title,
    titleSlug: data.question.titleSlug,
    difficulty: data.question.difficulty,
    isPaidOnly: data.question.isPaidOnly,
    question: data.question.content,
    exampleTestcases: data.question.exampleTestcases,
    topicTags: data.question.topicTags,
    hints: data.question.hints,
    solution: data.question.solution,
    companyTagStats: data.question.companyTagStats,
    likes: data.question.likes,
    dislikes: data.question.dislikes,
    similarQuestions: data.question.similarQuestions,
});

export const formatProblemsData = (data: ProblemSetQuestionListData) => ({
    totalQuestions: data.problemsetQuestionList.total,
    count: data.problemsetQuestionList.questions.length,
    problemsetQuestionList: data.problemsetQuestionList.questions,
});

export const formatContestData = (data: any) => ({
    contestAttend: data.userContestRanking?.attendedContestsCount,
    contestRating: data.userContestRanking?.rating,
    contestGlobalRanking: data.userContestRanking?.globalRanking,
    totalParticipants: data.userContestRanking?.totalParticipants,
    contestTopPercentage: data.userContestRanking?.topPercentage,
    contestBadges: data.userContestRanking?.badge,
    contestParticipation: data.userContestRankingHistory.filter(
        (obj: any) => obj.attended === true,
    ),
});
