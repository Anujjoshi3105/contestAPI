import { FastifyPluginAsync } from 'fastify';
import * as handlers from '../handlers';
import * as schemas from '../schemas';
import validateUsername from '../../../shared/middlewares/validate';
import type { ContestRankingQuery } from '../types';

const contestRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get<{ Querystring: ContestRankingQuery }>(
        '/ranking',
        {
            preHandler: [validateUsername],
            schema: schemas.contestRankingSchema,
        },
        handlers.getContestRankingHandler
    );

    fastify.get<{ Querystring: ContestRankingQuery }>(
        '/rating',
        {
            preHandler: [validateUsername],
            schema: schemas.userRatingSchema,
        },
        handlers.getUserRatingHandler
    );

    fastify.get(
        '/histogram',
        { schema: schemas.contestHistogramSchema },
        handlers.getContestHistogramHandler
    );

    fastify.get(
        '/all',
        { schema: schemas.allContestsSchema },
        handlers.getAllContestsHandler
    );

    fastify.get(
        '/upcoming',
        { schema: schemas.upcomingContestsSchema },
        handlers.getUpcomingContestsHandler
    );
};

export default contestRoutes;
