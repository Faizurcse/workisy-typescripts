import { config } from 'dotenv';
config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  REDIS,
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  //JWT
  JWT_ACCESS_KEY,
  JWT_REFRESH_KEY,
  JWT_AT_EXPIRY,
  JWT_RT_EXPIRY,
// Database
  DB_USERNAME,
  DB_PASSWORD,
  DB_URL,
  LOCAL_DB_URL,
  // redis
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USERNAME,
  // cloudinary
  CLOUDNAME,
  API_KEY,
  API_SECRET,
 
} = process.env;
