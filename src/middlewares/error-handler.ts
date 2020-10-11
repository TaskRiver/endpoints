import { Context, Next } from "koa";
import { Middleware } from "koa-compose";

/**
 * @param context
 * @param next
 */
export default function errorHandler(): Middleware<Context> {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (error) {
      ctx.status = (error.status as number) || 500;
      ctx.body = {
        error: true,
        message: error?.message || "Something went wrong."
      };
      ctx.app.emit("error", error, ctx);
    }
  };
}
