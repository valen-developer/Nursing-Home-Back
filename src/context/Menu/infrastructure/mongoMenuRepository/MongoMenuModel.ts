import mongoose from 'mongoose';

const { Schema } = mongoose;

const MenuSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

export const MenuMongoModel: mongoose.Model<any, any, any> = mongoose.model(
  'menu',
  MenuSchema
);
