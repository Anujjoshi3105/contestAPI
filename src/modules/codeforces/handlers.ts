import { FastifyRequest, FastifyReply } from 'fastify';
import * as service from './service';
import type {
    UserQuery,
    StatusQuery,
    ProblemsetQuery,
    RecentActionsQuery,
    ContestQuery,
    StandingsQuery,
    ContestStatusQuery,
    BlogEntryQuery,
    RecentStatusQuery
} from './types';

export async function getUserRatingHandler(
    request: FastifyRequest<{ Querystring: UserQuery }>,
    reply: FastifyReply
) {
    const { username } = request.query;
    const data = await service.getUserRating(username);
    return reply.send(data);
}

export async function getContestHistoryHandler(
    request: FastifyRequest<{ Querystring: UserQuery }>,
    reply: FastifyReply
) {
    const { username } = request.query;
    const data = await service.getContestHistory(username);
    return reply.send(data);
}

export async function getUserStatusHandler(
    request: FastifyRequest<{ Querystring: StatusQuery }>,
    reply: FastifyReply
) {
    const { username, from = 1, count = 10 } = request.query;
    const data = await service.getUserStatus(username, Number(from), Number(count));
    return reply.send(data);
}

export async function getUserBlogsHandler(
    request: FastifyRequest<{ Querystring: UserQuery }>,
    reply: FastifyReply
) {
    const { username } = request.query;
    const data = await service.getUserBlogs(username);
    return reply.send(data);
}

export async function getSolvedProblemsHandler(
    request: FastifyRequest<{ Querystring: UserQuery }>,
    reply: FastifyReply
) {
    const { username } = request.query;
    const data = await service.getSolvedProblems(username);
    return reply.send(data);
}

export async function getContestsHandler(
    request: FastifyRequest<{ Querystring: { gym?: boolean } }>,
    reply: FastifyReply
) {
    const { gym = false } = request.query;
    const data = await service.getContests(gym);
    return reply.send(data);
}

export async function getRecentActionsHandler(
    request: FastifyRequest<{ Querystring: RecentActionsQuery }>,
    reply: FastifyReply
) {
    const { maxCount = 20 } = request.query;
    const data = await service.getRecentActions(Number(maxCount));
    return reply.send(data);
}

export async function getProblemsHandler(
    request: FastifyRequest<{ Querystring: ProblemsetQuery }>,
    reply: FastifyReply
) {
    const { tags } = request.query;
    const data = await service.getProblems(tags);
    return reply.send(data);
}

export async function getContestStandingsHandler(
    request: FastifyRequest<{ Querystring: StandingsQuery }>,
    reply: FastifyReply
) {
    const { contestId, from, count, handles, room, showUnofficial } = request.query;
    const data = await service.getContestStandings(
        Number(contestId),
        from ? Number(from) : undefined,
        count ? Number(count) : undefined,
        handles,
        room ? Number(room) : undefined,
        showUnofficial
    );
    return reply.send(data);
}

export async function getContestRatingChangesHandler(
    request: FastifyRequest<{ Querystring: ContestQuery }>,
    reply: FastifyReply
) {
    const { contestId } = request.query;
    const data = await service.getContestRatingChanges(Number(contestId));
    return reply.send(data);
}

export async function getContestHacksHandler(
    request: FastifyRequest<{ Querystring: ContestQuery }>,
    reply: FastifyReply
) {
    const { contestId } = request.query;
    const data = await service.getContestHacks(Number(contestId));
    return reply.send(data);
}

export async function getContestStatusHandler(
    request: FastifyRequest<{ Querystring: ContestStatusQuery }>,
    reply: FastifyReply
) {
    const { contestId, handle, from, count } = request.query;
    const data = await service.getContestStatus(
        Number(contestId),
        handle,
        from ? Number(from) : undefined,
        count ? Number(count) : undefined
    );
    return reply.send(data);
}

export async function getProblemsetRecentStatusHandler(
    request: FastifyRequest<{ Querystring: RecentStatusQuery }>,
    reply: FastifyReply
) {
    const { count = 10 } = request.query;
    const data = await service.getProblemsetRecentStatus(Number(count));
    return reply.send(data);
}

export async function getBlogEntryHandler(
    request: FastifyRequest<{ Querystring: BlogEntryQuery }>,
    reply: FastifyReply
) {
    const { blogEntryId } = request.query;
    const data = await service.getBlogEntry(Number(blogEntryId));
    return reply.send(data);
}

export async function getBlogCommentsHandler(
    request: FastifyRequest<{ Querystring: BlogEntryQuery }>,
    reply: FastifyReply
) {
    const { blogEntryId } = request.query;
    const data = await service.getBlogComments(Number(blogEntryId));
    return reply.send(data);
}
