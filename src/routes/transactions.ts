import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateTransactionController } from "../controllers/createTransactionController";
import { GetAllTransactinosController } from "../controllers/getAllTransactionsController";
import { GetSummaryTransactionController } from "../controllers/getSummaryTranasctionController";
import { GetTransactionController } from "../controllers/getTransactionController";
import { checkSessionIdExists } from "../middlewares/checkSessionIdExists";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request: FastifyRequest) => {
      const getAllTransactionsController = new GetAllTransactinosController();

      const response = await getAllTransactionsController.handle(request);

      return response;
    }
  );

  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request: FastifyRequest) => {
      const getTransactionController = new GetTransactionController();

      const response = await getTransactionController.handle(request);

      return response;
    }
  );

  app.get(
    "/summary",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request: FastifyRequest) => {
      const getSummaryTransactionController =
        new GetSummaryTransactionController();

      const response = getSummaryTransactionController.handle(request);

      return response;
    }
  );

  app.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
    const createTransactionController = new CreateTransactionController();

    const response = await createTransactionController.handle(request, reply);

    return response;
  });
}
