export const config = {
  port: Number(process.env.PORT ?? 8000),
  mongoUri:
    process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit-tracker',
};
