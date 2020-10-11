import Koa from "koa";
import bodyParser from "koa-body";
import cors from "@koa/cors";
import routes from "./routes";

const app = new Koa();

app.use(cors()).use(bodyParser()).use(routes());

app.onerror = e => {
  console.error(e);
};

export default app;
