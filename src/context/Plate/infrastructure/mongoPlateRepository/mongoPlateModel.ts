import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlateSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  menuUuid: {
    type: String,
    required: true,
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
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  receipe: {
    type: String,
    required: false,
  },
});

export const PlateMongoModel: mongoose.Model<any, any, any> = mongoose.model(
  'plate',
  PlateSchema
);
