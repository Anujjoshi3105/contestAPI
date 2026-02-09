import { FastifyPluginAsync } from 'fastify';
import * as handlers from './handlers';
import * as schemas from './schemas';
import validateUsername from '../../shared/middlewares/validate';
import type {
    StatusQuery,
    UserQuery,
    ContestQuery,
    StandingsQuery,
    ContestStatusQuery,
    BlogEntryQuery,
    RecentStatusQuery
} from './types';

const codeforcesRoutes: FastifyPluginAsync = async (fastify) => {
    // User routes (with username validation)
    fastify.get<{ Querystring: UserQuery }>(
        '/rating',
        { preHandler: [validateUsername], schema: schemas.userRatingSchema },
        handlers.getUserRatingHandler
    );

    fastify.get<{ Querystring: UserQuery }>(
        '/contest-history',
        { preHandler: [validateUsername], schema: schemas.contestHistorySchema },
        handlers.getContestHistoryHandler
    );

    fastify.get<{ Querystring: StatusQuery }>(
        '/status',
        { preHandler: [validateUsername], schema: schemas.userStatusSchema },
        handlers.getUserStatusHandler
    );

    fastify.get<{ Querystring: UserQuery }>(
        '/blogs',
        { preHandler: [validateUsername], schema: schemas.userBlogsSchema },
        handlers.getUserBlogsHandler
    );

    fastify.get<{ Querystring: UserQuery }>(
        '/solved-problems',
        { preHandler: [validateUsername], schema: schemas.solvedProblemsSchema },
        handlers.getSolvedProblemsHandler
    );

    // General platform routes
    fastify.get('/contests', { schema: schemas.contestsSchema }, handlers.getContestsHandler);
    fastify.get('/recent-actions', { schema: schemas.recentActionsSchema }, handlers.getRecentActionsHandler);
    fastify.get('/problems', { schema: schemas.problemsSchema }, handlers.getProblemsHandler);

    // Contest specific routes
    fastify.get<{ Querystring: StandingsQuery }>(
        '/contest/standings',
        { schema: schemas.contestStandingsSchema },
        handlers.getContestStandingsHandler
    );

    fastify.get<{ Querystring: ContestQuery }>(
        '/contest/rating-changes',
        { schema: schemas.contestRatingChangesSchema },
        handlers.getContestRatingChangesHandler
    );

    fastify.get<{ Querystring: ContestQuery }>(
        '/contest/hacks',
        { schema: schemas.contestHacksSchema },
        handlers.getContestHacksHandler
    );

    fastify.get<{ Querystring: ContestStatusQuery }>(
        '/contest/status',
        { schema: schemas.contestStatusSchema },
        handlers.getContestStatusHandler
    );

    // Problemset routes
    fastify.get<{ Querystring: RecentStatusQuery }>(
        '/problemset/recent-status',
        { schema: schemas.problemsetRecentStatusSchema },
        handlers.getProblemsetRecentStatusHandler
    );

    // Blog routes
    fastify.get<{ Querystring: BlogEntryQuery }>(
        '/blog/view',
        { schema: schemas.blogEntrySchema },
        handlers.getBlogEntryHandler
    );

    fastify.get<{ Querystring: BlogEntryQuery }>(
        '/blog/comments',
        { schema: schemas.blogCommentsSchema },
        handlers.getBlogCommentsHandler
    );
};

export default codeforcesRoutes;
