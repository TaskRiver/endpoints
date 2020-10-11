import { Context } from "koa";
import TaskStore from "../stores/Task";
import { Step } from "../models/Task";

type KeyPair = { [key: string]: string | any | unknown; [key: number]: string };

export default class TaskService {
  taskStore: TaskStore;
  constructor() {
    this.taskStore = new TaskStore();
  }
  create = async (ctx: Context): Promise<void> => {
    const { id: userId } = ctx.state.user as KeyPair;
    const { name, steps = [], currentStep = 0, completed = false, percentComplete = 0 } = ctx
      .request.body as KeyPair;

    const task = (await this.taskStore.create({
      name,
      steps,
      currentStep,
      completed,
      userId,
      percentComplete
    })) as unknown;

    ctx.body = task;
  };
  read = async (ctx: Context): Promise<void> => {
    const { id } = ctx.params as KeyPair;

    const task = ((await this.taskStore.read(id)) as unknown) as KeyPair;
    ctx.assert(task, 404, "Task not found.");

    const { _id, ...rest } = task;
    ctx.body = { id: _id, ...rest };
  };

  readByUser = async (ctx: Context): Promise<void> => {
    const { id: userId } = ctx.state.user as KeyPair;

    ctx.body = await this.taskStore.readByUser(userId);
  };
}
