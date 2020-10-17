import NoteModel, { Note, NoteDocument } from "../models/Note";

export default class TaskStore {
  create = async (params: Note): Promise<NoteDocument | null> => {
    const user = (await NoteModel.create(params)).toObject();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  };

  // read = (id: string): Promise<NoteDocument | null> => {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //   // return NoteModel.findOne({ _id: id });
  // };

  update = async ({ id, ...rest }: any): Promise<NoteDocument | null> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return NoteModel.update({ _id: id }, { ...rest });
  };

  readByTask = async (taskId: string): Promise<NoteDocument[] | null> => {
    return NoteModel.find({ taskId }).exec();
  };
}
