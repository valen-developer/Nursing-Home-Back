import mongoose from 'mongoose';

const { Schema } = mongoose;

const InstalationSchema = new Schema({
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

export const InstalationMongoModel: mongoose.Model<any, any, any> =
  mongoose.model('instalation', InstalationSchema);
