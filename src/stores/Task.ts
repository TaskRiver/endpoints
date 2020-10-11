import TaskModel, { Task, TaskDocument } from "../models/Task";

export default class TaskStore {
  create = async (params: Task): Promise<TaskDocument | null> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = (await TaskModel.create(params)).toObject();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  };

  read = async (id: string): Promise<TaskDocument | null> => {
    return TaskModel.findOne({ _id: id });
  };

  readByUser = async (userId: string): Promise<TaskDocument[] | null> => {
    return TaskModel.find({ userId }).exec();
  };
}
