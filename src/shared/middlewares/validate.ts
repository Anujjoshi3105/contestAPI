import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";

const validateUsername = (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
) => {
    const username = (request.query as any).username || (request.params as any).username;
    if (!username || typeof username !== "string" || username.trim() === "") {
        reply.status(400).send({ error: "Invalid or missing username" });
        return;
    }
    request.username = username.trim();
    done();
};

export default validateUsername;
