import mongoose from "mongoose";

const { Schema } = mongoose;

const NewsSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  own: {
    type: String,
    required: true,
  },
  ownName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imagePaths: {
    type: [String],
  },
});

export const NewsMongoModel: mongoose.Model<any, any, any> = mongoose.model(
  "news",
  NewsSchema
);
