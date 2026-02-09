import { FastifyRequest, FastifyReply } from 'fastify';
import * as service from './service';
import type {
    UserQuery,
    SubmissionsQuery,
    UserPostsQuery,
    LeaderboardQuery,
    PromotionalEventsQuery
} from './types';

export async function getUserRatingHandler(
    request: FastifyRequest<{ Querystring: UserQuery }>,
    reply: FastifyReply
) {
    const { username } = request.query;
    const data = await service.getUserRating(username);
    return reply.send(data);
}

export async function getUserSubmissionsHandler(
    request: FastifyRequest<{ Body: SubmissionsQuery }>,
    reply: FastifyReply
) {
    const data = await service.getUserSubmissions(request.body);
    return reply.send(data);
}

export async function getUserPostsHandler(
    request: FastifyRequest<{ Params: { username: string }, Querystring: Omit<UserPostsQuery, 'username'> }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const { fetch_type, page } = request.query;
    const data = await service.getUserPosts({ username, fetch_type, page });
    return reply.send(data);
}

export async function getPromotionalEventsHandler(
    request: FastifyRequest<{ Querystring: PromotionalEventsQuery }>,
    reply: FastifyReply
) {
    const data = await service.getPromotionalEvents(request.query);
    return reply.send(data);
}

export async function getContestLeaderboardHandler(
    request: FastifyRequest<{ Querystring: LeaderboardQuery }>,
    reply: FastifyReply
) {
    const data = await service.getContestLeaderboard(request.query);
    return reply.send(data);
}
