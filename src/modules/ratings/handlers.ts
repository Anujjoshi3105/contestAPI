import { FastifyRequest, FastifyReply } from 'fastify';
import * as service from './service';
import type { PlatformQuery, PlatformParams } from './types';

export async function getAllRatingsHandler(
    request: FastifyRequest<{ Querystring: PlatformQuery }>,
    reply: FastifyReply
) {
    const { username } = request.query;

    try {
        const data = await service.getAllRatings(username);
        return reply.send(data);
    } catch (error: any) {
        return reply.status(500).send({
            error: 'Error fetching ratings',
        });
    }
}

export async function getPlatformRatingHandler(
    request: FastifyRequest<{ Querystring: PlatformQuery; Params: PlatformParams }>,
    reply: FastifyReply
) {
    const { username } = request.query;
    const { platform } = request.params;

    try {
        const rating = await service.getPlatformRating(platform, username);
        return reply.send({ platform, username, ...rating });
    } catch (error: any) {
        if (error.message === 'Invalid platform') {
            return reply.status(400).send({ error: 'Invalid platform' });
        }
        return reply.status(500).send({
            error: `Error fetching ${platform} rating`,
        });
    }
}
