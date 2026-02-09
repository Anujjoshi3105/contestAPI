import { FastifyRequest, FastifyReply } from 'fastify';
import * as service from './service';
import type { UserQuery, ContestQuery } from './types';

export async function getUserRatingHandler(
    request: FastifyRequest<{ Querystring: UserQuery }>,
    reply: FastifyReply
) {
    const { username } = request.query;
    const data = await service.getUserRating(username);
    return reply.send(data);
}

export async function getUserHistoryHandler(
    request: FastifyRequest<{ Querystring: UserQuery }>,
    reply: FastifyReply
) {
    const { username } = request.query;
    const data = await service.getUserHistory(username);
    return reply.send(data);
}

export async function getContestStandingsHandler(
    request: FastifyRequest<{ Querystring: ContestQuery & { extended?: boolean } }>,
    reply: FastifyReply
) {
    const { contestId, extended } = request.query;
    const data = await service.getContestStandings(contestId, extended);
    return reply.send(data);
}

export async function getContestResultsHandler(
    request: FastifyRequest<{ Querystring: ContestQuery }>,
    reply: FastifyReply
) {
    const { contestId } = request.query;
    const data = await service.getContestResults(contestId);
    return reply.send(data);
}

export async function getVirtualStandingsHandler(
    request: FastifyRequest<{ Querystring: ContestQuery & { showGhost?: boolean } }>,
    reply: FastifyReply
) {
    const { contestId, showGhost } = request.query;
    const data = await service.getVirtualStandings(contestId, showGhost);
    return reply.send(data);
}
