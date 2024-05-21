import fastify from "fastify";
import cookie from "@fastify/cookie";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";

const app = fastify();

app.register(cookie);
app.register(transactionsRoutes, {
  prefix: "transactions",
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.listen({ port: env.PORT }).then(() => {
  console.log("🚀 HTTP server is running on port", env.PORT);
});
