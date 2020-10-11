import { Context } from "koa";

export default class Task {
  create = (ctx: Context): void => {
    console.log("hello");
    ctx.body = "working.";
  };
  read = (ctx: Context): void => {
    console.log("hello");
    ctx.body = "working.";
  };
}
