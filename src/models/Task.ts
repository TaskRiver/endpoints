import mongoose, { Schema, Document } from "mongoose";

export interface Step {
  title: string;
  uri: string;
  message?: string;
}

export interface Task {
  name: string;
  steps: Step[];
  currentStep: number | null; //Step is null for task that are not started yet
  completed: boolean; // If this task is complete
  userId: string; // User this task is for
  percentComplete: number;
}

export type TaskDocument = Document & Task;

const StepSchema = new Schema({
  title: { type: String },
  uri: { type: String },
  message: { type: String }
});

const TaskSchema: Schema<unknown> = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  steps: [StepSchema],
  currentStep: { type: String },
  completed: { type: Boolean },
  percentComplete: { type: Number }
});

export default mongoose.model<TaskDocument>("Task", TaskSchema);
