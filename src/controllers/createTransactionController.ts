import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";
import { CreateTransactionProps } from "../interfaces/transactionInterface";

export class CreateTransactionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, amount, type } = request.body as CreateTransactionProps;

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return reply.status(201).send({});
  }
}
