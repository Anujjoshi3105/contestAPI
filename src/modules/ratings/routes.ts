import { FastifyPluginAsync } from 'fastify';
import * as handlers from './handlers';
import * as schemas from './schemas';
import validateUsername from '../../shared/middlewares/validate';
import type { PlatformQuery, PlatformParams } from './types';

const ratingsRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get<{ Querystring: PlatformQuery }>(
        '/',
        {
            preHandler: [validateUsername],
            schema: schemas.allRatingsSchema,
        },
        handlers.getAllRatingsHandler
    );

    fastify.get<{ Querystring: PlatformQuery; Params: PlatformParams }>(
        '/:platform',
        {
            preHandler: [validateUsername],
            schema: schemas.platformRatingSchema,
        },
        handlers.getPlatformRatingHandler
    );
};

export default ratingsRoutes;
