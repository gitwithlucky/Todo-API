const config = {
  production: process.env.PRODUCTION_URL,
  serverPort: process.env.PORT || 8080,
  appName: "TODO API",
  apiVersion: "v1",
  database: {
    endPoint: process.env.DATABASE_URL,
  },
  encryptionKey: process.env.ENCRYPTION_KEY,
  development: process.env.DEVELOPMENT?.toLowerCase() === "true" ? true : false,
  appKey: process.env.APP_KEY,
  authName: process.env.AUTH_NAME,
  saltRounds: 10,
  tokenLife: 1440, //minutes (24 hours)
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
};

export default config;
