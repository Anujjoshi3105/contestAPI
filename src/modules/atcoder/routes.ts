import { FastifyPluginAsync } from 'fastify';
import * as handlers from './handlers';
import * as schemas from './schemas';
import validateUsername from '../../shared/middlewares/validate';
import type { UserQuery, ContestQuery } from './types';

const atcoderRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get<{ Querystring: UserQuery }>(
        '/rating',
        {
            preHandler: [validateUsername],
            schema: schemas.userRatingSchema,
        },
        handlers.getUserRatingHandler
    );

    fastify.get<{ Querystring: UserQuery }>(
        '/history',
        {
            preHandler: [validateUsername],
            schema: schemas.userHistorySchema,
        },
        handlers.getUserHistoryHandler
    );

    fastify.get<{ Querystring: ContestQuery & { extended?: boolean } }>(
        '/standings',
        {
            schema: schemas.contestStandingsSchema,
        },
        handlers.getContestStandingsHandler
    );

    fastify.get<{ Querystring: ContestQuery }>(
        '/results',
        {
            schema: schemas.contestResultsSchema,
        },
        handlers.getContestResultsHandler
    );

    fastify.get<{ Querystring: ContestQuery & { showGhost?: boolean } }>(
        '/virtual-standings',
        {
            schema: schemas.virtualStandingsSchema,
        },
        handlers.getVirtualStandingsHandler
    );
};

export default atcoderRoutes;
