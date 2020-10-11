import { Context, Next } from "koa";
import { Middleware } from "koa-compose";
import admin from "../connections/firebase-auth";

/**
 * @param context
 * @param next
 */
export default function authenticate(): Middleware<Context> {
  return async (ctx: Context, next: Next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { authorization: token } = ctx.request.header;
    ctx.assert(token, 204, "Missing auth token.");

    const firebaseUser = await admin.auth().verifyIdToken(token);
    ctx.assert(token, 204, "Invalid auth token.");

    const {
      uid: id,
      email,
      iss,
      auth_time: authTime,
      user_id: userId,
      sub,
      iat,
      exp,
      email_verified: emailVerified,
      firebase
    } = firebaseUser as { [key: string]: string };

    ctx.state.user = {
      id,
      email,
      iss,
      authTime,
      userId,
      sub,
      iat,
      exp,
      emailVerified,
      firebase
    };

    await next();
  };
}
