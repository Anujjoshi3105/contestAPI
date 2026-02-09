import { FastifyPluginAsync } from 'fastify';
import * as handlers from './handlers';
import * as schemas from './schemas';
import validateUsername from '../../shared/middlewares/validate';
import type {
    UserQuery,
    SubmissionsQuery,
    UserPostsQuery,
    LeaderboardQuery,
    PromotionalEventsQuery
} from './types';

const gfgRoutes: FastifyPluginAsync = async (fastify) => {
    // Legacy mapping (GET for consistency with other platforms)
    fastify.get<{ Querystring: UserQuery }>(
        '/rating',
        {
            preHandler: [validateUsername],
            schema: schemas.userRatingSchema,
        },
        handlers.getUserRatingHandler
    );

    // New APIs
    fastify.post<{ Body: SubmissionsQuery }>(
        '/submissions',
        {
            schema: schemas.userSubmissionsSchema,
        },
        handlers.getUserSubmissionsHandler
    );

    fastify.get<{ Params: { username: string }, Querystring: Omit<UserPostsQuery, 'username'> }>(
        '/posts/:username',
        {
            schema: schemas.userPostsSchema,
        },
        handlers.getUserPostsHandler
    );

    fastify.get<{ Querystring: PromotionalEventsQuery }>(
        '/events/promotional',
        {
            schema: schemas.promotionalEventsSchema,
        },
        handlers.getPromotionalEventsHandler
    );

    fastify.get<{ Querystring: LeaderboardQuery }>(
        '/leaderboard',
        {
            schema: schemas.contestLeaderboardSchema,
        },
        handlers.getContestLeaderboardHandler
    );
};

export default gfgRoutes;
