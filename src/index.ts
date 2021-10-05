import cors from 'cors';
import { json, urlencoded } from 'express';

import { enviroment } from './app/config/enviroment';
import { getContainer } from './app/dic/getContainer';
import { Server } from './app/server';

export { mongooseConnection } from './helpers/connectMongoDB';
export { redisClient } from './helpers/connectRedis';

const server = new Server(enviroment.port);

// set middlewares
server.app.use(urlencoded({ extended: false }));
server.app.use(json());
server.app.use(cors());

export const container = getContainer();

server.start();
