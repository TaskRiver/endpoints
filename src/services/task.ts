import { Context } from "koa";

export default class Task {
  create = (ctx: Context) => {
    console.log("hello");
    ctx.body = "working.";
  };
  read = (ctx: Context) => {
    console.log("hello");
    ctx.body = "working.";
  };
}
