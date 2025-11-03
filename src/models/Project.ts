import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    client: { type: String },
    image: { type: String },
    slug: { type: String, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Project = models.Project || mongoose.model("Project", ProjectSchema);
export default Project;
