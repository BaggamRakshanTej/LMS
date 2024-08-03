import { Redis } from 'ioredis';
require("dotenv").config();

const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log('Redis connected')
        return process.env.REDIS_URL;
    }
    throw new Error('Redis connection failed');
}

export const redis = new Redis(redisClient());

// This only works, when we use build an authentication system and is used to fetch the users