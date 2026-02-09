import { FastifyPluginAsync } from 'fastify';
import userRoutes from './routes/user.routes';
import contestRoutes from './routes/contest.routes';
import problemRoutes from './routes/problem.routes';
import discussionRoutes from './routes/discussion.routes';

const leetcodeRoutes: FastifyPluginAsync = async (fastify) => {
    // Register specific category routes first
    await fastify.register(contestRoutes, { prefix: '/contest' });
    await fastify.register(problemRoutes, { prefix: '/problem' });
    await fastify.register(discussionRoutes, { prefix: '/discuss' });

    // Register user routes at root last to handle /api/v1/leetcode/{username}
    await fastify.register(userRoutes, { prefix: '/' });
};

export default leetcodeRoutes;
