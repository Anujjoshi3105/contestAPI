import { FastifyRequest, FastifyReply } from 'fastify';
import * as service from '../services';
import type { ContestRankingQuery } from '../types';

export async function getUserRatingHandler(
    request: FastifyRequest<{ Querystring: ContestRankingQuery }>,
    reply: FastifyReply
) {
    const { username } = request.query;
    const data = await service.getUserRating(username);
    return reply.send(data);
}

export async function getUserProfileHandler(
    request: FastifyRequest<{ Params: { username: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const data = await service.getUserProfile(username);
    return reply.send(data);
}

export async function getUserDetailsHandler(
    request: FastifyRequest<{ Params: { username: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const data = await service.getUserDetails(username);
    return reply.send(data);
}

export async function getUserBadgesHandler(
    request: FastifyRequest<{ Params: { username: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const data = await service.getUserBadges(username);
    return reply.send(data);
}

export async function getUserSolvedHandler(
    request: FastifyRequest<{ Params: { username: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const data = await service.getUserSolved(username);
    return reply.send(data);
}

export async function getUserContestHandler(
    request: FastifyRequest<{ Params: { username: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const data = await service.getUserContest(username);
    return reply.send(data);
}

export async function getUserContestHistoryHandler(
    request: FastifyRequest<{ Params: { username: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const data = await service.getUserContestHistory(username);
    return reply.send(data);
}

export async function getUserSubmissionHandler(
    request: FastifyRequest<{ Params: { username: string }; Querystring: { limit?: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const limit = parseInt(request.query.limit || '20', 10);
    const data = await service.getUserSubmission(username, limit);
    return reply.send(data);
}

export async function getUserAcSubmissionHandler(
    request: FastifyRequest<{ Params: { username: string }; Querystring: { limit?: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const limit = parseInt(request.query.limit || '20', 10);
    const data = await service.getUserAcSubmission(username, limit);
    return reply.send(data);
}

export async function getUserCalendarHandler(
    request: FastifyRequest<{ Params: { username: string }; Querystring: { year?: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const year = parseInt(request.query.year || '0', 10);
    const data = await service.getUserCalendar(username, year);
    return reply.send(data);
}

export async function getUserSkillHandler(
    request: FastifyRequest<{ Params: { username: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const data = await service.getUserSkill(username);
    return reply.send(data);
}

export async function getUserLanguageHandler(
    request: FastifyRequest<{ Params: { username: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const data = await service.getUserLanguage(username);
    return reply.send(data);
}

export async function getUserProgressHandler(
    request: FastifyRequest<{ Params: { username: string } }>,
    reply: FastifyReply
) {
    const { username } = request.params;
    const data = await service.getUserProgress(username);
    return reply.send(data);
}
