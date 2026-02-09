import { FastifyRequest, FastifyReply } from 'fastify';
import * as service from '../services';
import type { ContestRankingQuery } from '../types';

export async function getContestRankingHandler(
    request: FastifyRequest<{ Querystring: ContestRankingQuery }>,
    reply: FastifyReply
) {
    const { username } = request.query;
    const data = await service.getContestRankingInfo(username);
    return reply.send(data);
}

export async function getContestHistogramHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const data = await service.getContestHistogram();
    return reply.send(data);
}

export async function getAllContestsHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const data = await service.getAllContests();
    return reply.send(data);
}

export async function getUpcomingContestsHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const data = await service.getUpcomingContests();
    return reply.send(data);
}
