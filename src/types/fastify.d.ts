import 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        username?: string;
    }
}
