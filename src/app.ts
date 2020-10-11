import Koa from "koa";
import bodyParser from "koa-body";
import cors from "@koa/cors";
import routes from "./routes";
import errorHandler from "./middlewares/error-handler";

const app = new Koa();

app.use(cors()).use(bodyParser()).use(errorHandler()).use(routes());

app.onerror = e => {
  console.error(e);
};

export default app;
