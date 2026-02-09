import { FastifyRequest, FastifyReply } from 'fastify';
import * as service from './service';
import type { UserQuery } from './types';

export async function getUserRatingHandler(
    request: FastifyRequest<{ Querystring: UserQuery }>,
    reply: FastifyReply
) {
    const { username } = request.query;
    const data = await service.getUserRating(username);
    return reply.send(data);
}
