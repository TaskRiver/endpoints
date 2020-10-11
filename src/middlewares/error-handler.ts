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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ctx.status = (error.status as number) || 500;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const message = (error.message || "Something went wrong.") as string;
      ctx.body = {
        error: true,
        message
      };
      ctx.app.emit("error", error, ctx);
    }
  };
}
