import { FastifyRequest, FastifyReply } from 'fastify';
import * as service from '../services';

export async function getDailyProblemHandler(request: FastifyRequest, reply: FastifyReply) {
    const raw = (request.query as any).raw === 'true';
    const data = await service.getDailyProblem(raw);
    return reply.send(data);
}

export async function getSelectProblemHandler(
    request: FastifyRequest<{ Querystring: { titleSlug: string; raw?: string } }>,
    reply: FastifyReply
) {
    const { titleSlug, raw } = request.query;
    if (!titleSlug) {
        return reply.status(400).send({ error: 'Missing titleSlug query parameter' });
    }
    const data = await service.getSelectProblem(titleSlug, raw === 'true');
    return reply.send(data);
}

export async function getProblemsHandler(request: FastifyRequest, reply: FastifyReply) {
    const data = await service.getProblems(request.query);
    return reply.send(data);
}

export async function getOfficialSolutionHandler(
    request: FastifyRequest<{ Querystring: { titleSlug: string } }>,
    reply: FastifyReply
) {
    const { titleSlug } = request.query;
    if (!titleSlug) {
        return reply.status(400).send({ error: 'Missing titleSlug query parameter' });
    }
    const data = await service.getOfficialSolution(titleSlug);
    return reply.send(data);
}
