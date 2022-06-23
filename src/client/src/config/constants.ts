import 'dotenv/config';

export const BASE_URL =
  typeof window === 'undefined' ? `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}` : '';
