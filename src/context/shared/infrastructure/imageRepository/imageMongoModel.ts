import mongoose from 'mongoose';

const { Schema } = mongoose;

const ImageSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  entityUuid: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

export const ImageMongoModel: mongoose.Model<any, any, any> = mongoose.model(
  'image',
  ImageSchema
);
