import { FastifyPluginAsync } from 'fastify';
import * as handlers from '../handlers';
import * as schemas from '../schemas';
import validateUsername from '../../../shared/middlewares/validate';

const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.addHook('preHandler', validateUsername);

    fastify.get<{ Params: { username: string } }>(
        '/:username',
        { schema: schemas.userDetailsSchema },
        handlers.getUserDetailsHandler
    );

    fastify.get<{ Params: { username: string } }>(
        '/:username/badges',
        { schema: schemas.userBadgesSchema },
        handlers.getUserBadgesHandler
    );

    fastify.get<{ Params: { username: string } }>(
        '/:username/solved',
        { schema: schemas.userSolvedSchema },
        handlers.getUserSolvedHandler
    );

    fastify.get<{ Params: { username: string } }>(
        '/:username/contest',
        { schema: schemas.userContestSchema },
        handlers.getUserContestHandler
    );

    fastify.get<{ Params: { username: string } }>(
        '/:username/contest/history',
        { schema: schemas.userContestHistorySchema },
        handlers.getUserContestHistoryHandler
    );

    fastify.get<{ Params: { username: string }; Querystring: { limit?: string } }>(
        '/:username/submission',
        { schema: schemas.userSubmissionSchema },
        handlers.getUserSubmissionHandler
    );

    fastify.get<{ Params: { username: string }; Querystring: { limit?: string } }>(
        '/:username/accepted-submission',
        { schema: { ...schemas.userSubmissionSchema, summary: 'Get user accepted submissions' } },
        handlers.getUserAcSubmissionHandler
    );

    fastify.get<{ Params: { username: string }; Querystring: { year?: string } }>(
        '/:username/calendar',
        { schema: schemas.userCalendarSchema },
        handlers.getUserCalendarHandler
    );

    fastify.get<{ Params: { username: string } }>(
        '/:username/skill',
        { schema: schemas.userSkillSchema },
        handlers.getUserSkillHandler
    );

    fastify.get<{ Params: { username: string } }>(
        '/:username/profile',
        { schema: schemas.userProfileSchema },
        handlers.getUserProfileHandler
    );

    fastify.get<{ Params: { username: string } }>(
        '/:username/language',
        { schema: schemas.userLanguageSchema },
        handlers.getUserLanguageHandler
    );

    fastify.get<{ Params: { username: string } }>(
        '/:username/progress',
        { schema: schemas.userProgressSchema },
        handlers.getUserProgressHandler
    );
};

export default userRoutes;
