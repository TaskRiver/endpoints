import mongoose, { Document, Schema } from "mongoose";

export interface Note {
  _id?: string;
  title?: string;
  content: string;
  markdown: boolean; //default is false
  taskId: string;
}

export type NoteDocument = Note & Document;

export const NoteSchema = new Schema({
  title: { type: String },
  content: { type: String },
  markdown: { type: Boolean },
  taskId: { type: String }
});

export default mongoose.model<NoteDocument>("Note", NoteSchema);
