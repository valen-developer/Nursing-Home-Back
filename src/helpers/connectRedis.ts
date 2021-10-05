import redis from 'redis';

export const redisClient: redis.RedisClient = redis.createClient({
  auth_pass: 'admin',
});

redisClient.on('error', (err) => {
  console.log('Error on redis connection');
});
