import config from './config';

const corsOptions = {
  origin:  true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', config.authName],
  credentials: true,
  exposedHeaders: ['Access-Control-Allow-Origin']
};

export default corsOptions;