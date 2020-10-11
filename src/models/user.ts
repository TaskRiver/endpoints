import mongoose, { Schema, Document } from "mongoose";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
  email: string;
}

export type UserDocument = Document & User;

const UserSchema: Schema<User> = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String }
});

export default mongoose.model<UserDocument>("User", UserSchema);
