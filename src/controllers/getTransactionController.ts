import { FastifyRequest } from "fastify";
import { z } from "zod";
import { knex } from "../database";

export class GetTransactionController {
  async handle(request: FastifyRequest) {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionsParamsSchema.parse(request.params);

    const { sessionId } = request.cookies;

    const transaction = await knex("transactions")
      .where({
        session_id: sessionId,
        id,
      })
      .first();

    return {
      transaction,
    };
  }
}
