import { loadEnv } from './loadENV';
import { connectMongoDB } from './connectMongoDB';

export const initServerDependencies = () => {
  loadEnv();
  connectMongoDB();
};
