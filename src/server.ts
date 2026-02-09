import { buildApp } from "./app";
import config from "./config/env";

const start = async () => {
    try {
        const fastify = await buildApp();
        await fastify.listen({ port: config.port, host: config.host });
        console.log(`Server running on http://localhost:${config.port}`);
        console.log(`Swagger docs available at http://localhost:${config.port}/docs`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
