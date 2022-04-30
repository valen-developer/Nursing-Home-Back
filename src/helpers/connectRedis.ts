import redis from "redis";
import { enviroment } from "../app/config/enviroment";

export const redisClient: redis.RedisClient = redis.createClient({
  host: enviroment.redis.host,
  auth_pass: enviroment.redis.password,
});

redisClient.on("error", (err) => {
  console.log("Error on redis connection");
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});
