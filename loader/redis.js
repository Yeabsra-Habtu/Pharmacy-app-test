const redis = require('redis');
const config = require('../config'); 

// Create Redis client
// const redisClient = redis.createClient({
//   host: config.REDIS_HOST,
//   port: config.REDIS_PORT,
// });

const redisClient = redis.createClient({
  url: config.REDIS_URL
});



// Debug statements
redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redisClient;
