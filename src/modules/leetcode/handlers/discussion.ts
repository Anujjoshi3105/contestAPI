import { FastifyRequest, FastifyReply } from 'fastify';
import * as service from '../services';

export async function getTrendingDiscussHandler(
    request: FastifyRequest<{ Querystring: { first?: string } }>,
    reply: FastifyReply
) {
    const first = parseInt(request.query.first || '20', 10);
    const data = await service.getTrendingDiscuss(first);
    return reply.send(data);
}

export async function getDiscussTopicHandler(
    request: FastifyRequest<{ Params: { topicId: string } }>,
    reply: FastifyReply
) {
    const topicId = parseInt(request.params.topicId, 10);
    const data = await service.getDiscussTopic(topicId);
    return reply.send(data);
}

export async function getDiscussCommentsHandler(
    request: FastifyRequest<{ Params: { topicId: string }; Querystring: any }>,
    reply: FastifyReply
) {
    const topicId = parseInt(request.params.topicId, 10);
    const query = (request.query || {}) as Record<string, any>;
    const data = await service.getDiscussComments({ topicId, ...query });
    return reply.send(data);
}
