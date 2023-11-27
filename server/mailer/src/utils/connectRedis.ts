import { createClient } from 'redis';

const redisUrl = `redis://127.0.0.1:6379`;
const REDIS_HOST = `redis://127.0.0.1`;
const REDIS_PORT = 6379;
const redisClient = createClient({
//  url: redisUrl,
  legacyMode: true,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  }
});
// const pubClient = createClient({ url: 'redis://redis:6379' });

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('🚀 MAILER: Redis client connected...');
    redisClient.set(
      'tRPC',
      '🙌🙌Welcome to tRPC with React.js, Express and Typescript!'
    );
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }
};

//connectRedis();

redisClient.on('error', (err) => {
  console.error('redis error', err)
});

export {
  redisClient,
  connectRedis,
}
