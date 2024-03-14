import * as bcrypt from 'bcrypt';
import config from '../configs/config';

const saltRounds = config.saltRounds;
const generateHash = (password: string): string => {
  return bcrypt.hashSync(password, saltRounds);
};

const validatePassword = (password, hash): boolean => {
  try {
    return bcrypt.compareSync(password, hash);
  } catch (error) {
    console.log('ERROR:: An error occurred while comparing old and new password');
    return false;
  }
};
export { generateHash, validatePassword };
