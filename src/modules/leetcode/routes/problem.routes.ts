import { FastifyPluginAsync } from 'fastify';
import * as handlers from '../handlers';
import * as schemas from '../schemas';

const problemRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get(
        '/daily',
        { schema: schemas.dailyProblemSchema },
        handlers.getDailyProblemHandler
    );

    fastify.get<{ Querystring: { titleSlug: string; raw?: string } }>(
        '/select',
        { schema: schemas.selectProblemSchema },
        handlers.getSelectProblemHandler
    );

    fastify.get(
        '/list',
        { schema: schemas.listProblemsSchema },
        handlers.getProblemsHandler
    );

    fastify.get<{ Querystring: { titleSlug: string } }>(
        '/official-solution',
        { schema: schemas.officialSolutionSchema },
        handlers.getOfficialSolutionHandler
    );
};

export default problemRoutes;
