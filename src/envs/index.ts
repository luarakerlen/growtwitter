import "dotenv/config";

export const envs = {
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  API_HOST: process.env.API_HOST as string,
};
