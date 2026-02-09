import { FastifyPluginAsync } from 'fastify';
import * as handlers from './handlers';
import * as schemas from './schemas';
import validateUsername from '../../shared/middlewares/validate';
import type { UserQuery } from './types';

const codechefRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get<{ Querystring: UserQuery }>(
        '/rating',
        {
            preHandler: [validateUsername],
            schema: schemas.userRatingSchema,
        },
        handlers.getUserRatingHandler
    );
};

export default codechefRoutes;
