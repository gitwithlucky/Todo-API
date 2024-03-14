import mongoose, { Schema, model, Model, connect } from 'mongoose';

interface userModel {
  _id?: String;
  first_name: String;
  last_name: String;
  username: String;
  email: String;
  is_admin: Boolean;
  password: String;
  hash: String;
}

const user = {
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  is_admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  refreshToken: {
    type: String,
  }
};

const userSchema = new Schema(user, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const userRepository: Model<userModel> = model<userModel>('user', userSchema);

export { userRepository };