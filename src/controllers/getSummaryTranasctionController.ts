import { FastifyRequest } from "fastify";
import { knex } from "../database";

export class GetSummaryTransactionController {
  async handle(request: FastifyRequest) {
    const { sessionId } = request.cookies;

    const summary = await knex("transactions")
      .where("session_id", sessionId)
      .sum("amount", { as: "amount" })
      .first();

    return {
      summary,
    };
  }
}
