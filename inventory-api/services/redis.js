const Redis = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const getCache = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

const setCache = async (key, value, expInSeconds = 300) => {
  await redisClient.set(key, JSON.stringify(value), 'EX', expInSeconds);
};

// Deletes any cached coordinates when global stock changes
const invalidatePrefix = async (prefix) => {
  const keys = await redisClient.keys(`${prefix}*`);
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
};

module.exports = {
  redisClient,
  getCache,
  setCache,
  invalidatePrefix
};
