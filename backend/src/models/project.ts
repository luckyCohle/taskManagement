import mongoose, { Document, Mongoose, Schema } from "mongoose";

export interface IProject extends Document {
  name: string;
  createdBy: mongoose.Types.ObjectId;
  members:mongoose.Types.ObjectId[];
}

const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
  {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
]
    
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>(
  "Project",
  ProjectSchema
);