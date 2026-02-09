import { FastifyPluginAsync } from 'fastify';
import * as handlers from '../handlers';
import * as schemas from '../schemas';

const discussionRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get(
        '/trending',
        { schema: schemas.trendingDiscussSchema },
        handlers.getTrendingDiscussHandler
    );

    fastify.get<{ Params: { topicId: string } }>(
        '/topic/:topicId',
        { schema: schemas.discussionTopicSchema },
        handlers.getDiscussTopicHandler
    );

    fastify.get<{ Params: { topicId: string }; Querystring: any }>(
        '/comments/:topicId',
        { schema: schemas.discussionCommentsSchema },
        handlers.getDiscussCommentsHandler
    );
};

export default discussionRoutes;
