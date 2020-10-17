import { Context } from "koa";
import NoteStore from "../stores/Note";

type KeyPair = { [key: string]: string | any | unknown; [key: number]: string };

export default class NoteService {
  noteStore: NoteStore;
  constructor() {
    this.noteStore = new NoteStore();
  }
  create = async (ctx: Context): Promise<void> => {
    const { id } = ctx.params as KeyPair;
    const { title = "", content = "", markdown = false, taskId } = ctx.request.body as KeyPair;

    const task = (await this.noteStore.create({
      title,
      content,
      markdown,
      taskId
    })) as unknown;

    ctx.body = task;
  };
  // read = async (ctx: Context): Promise<void> => {
  //   const { id } = ctx.params as KeyPair;

  //   const task = ((await this.noteStore.read(id)) as unknown) as KeyPair;
  //   ctx.assert(task, 404, "Task not found.");

  //   const { _id, ...rest } = task;
  //   ctx.body = { id: _id, ...rest };
  // };

  readByTask = async (ctx: Context): Promise<void> => {
    const { id } = ctx.params as KeyPair;
    ctx.body = await this.noteStore.readByTask(id);
  };

  update = async (ctx: Context): Promise<void> => {
    const { id } = ctx.params as KeyPair;
    const data = ctx.request.body;

    ctx.body = await this.noteStore.update({ id, ...data });
  };
}
