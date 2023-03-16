export const configuration = () => ({
  port: parseInt(process.env.PORT!, 10) || 3001,
  NODE_ENV: process.env.NODE_ENV,
});
