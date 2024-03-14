import config from '../configs/config';
import { connect } from 'mongoose';

class Database {
  static connect = async () => {
    const options = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    await connect(config.database.endPoint)
      .then(() => {
        console.log('Database Connected');
      })
      .catch((error) => {
        console.log(`Database Connection Error: ${error}`);
      });
  };
}

export default Database;
