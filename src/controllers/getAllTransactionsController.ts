import { FastifyRequest } from "fastify";
import { knex } from "../database";

export class GetAllTransactinosController {
  async handle(request: FastifyRequest) {
    const { sessionId } = request.cookies;

    const transactions = await knex("transactions")
      .where("session_id", sessionId)
      .select();

    return {
      transactions,
    };
  }
}
