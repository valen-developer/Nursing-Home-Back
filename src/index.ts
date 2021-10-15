import cors from 'cors';
import { json, urlencoded, static as serveStatic } from 'express';
import path from 'path';

import { enviroment } from './app/config/enviroment';
import { getContainer } from './app/dic/getContainer';
import { router } from './app/routes/index.routing';
import { Server } from './app/server';

export { mongooseConnection } from './helpers/connectMongoDB';
export { redisClient } from './helpers/connectRedis';

const server = new Server(enviroment.port);

// set middlewares
server.app.use(urlencoded({ extended: false }));
server.app.use(json());
server.app.use(cors());

// serve public folder
server.app.use('/api', serveStatic(path.join(__dirname, '..', 'public')));

export const container = getContainer();

server.app.use('/api', router);

server.start();
