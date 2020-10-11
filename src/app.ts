import Koa from "koa";
import bodyParser from "koa-body";
import cors from "@koa/cors";
import routes from "./routes";
import errorHandler from "./middlewares/error-handler";
import authenticate from "./middlewares/authenticate";

const app = new Koa();

app.use(cors()).use(bodyParser()).use(errorHandler()).use(authenticate()).use(routes());

app.onerror = e => {
  console.error(e);
};

export default app;
