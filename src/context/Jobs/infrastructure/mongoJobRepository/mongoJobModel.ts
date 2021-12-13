import mongoose from "mongoose";

const { Schema } = mongoose;

const JobSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imagePaths: {
    type: [String],
  },
});

export const JobMongoModel: mongoose.Model<any, any, any> = mongoose.model(
  "job",
  JobSchema
);
