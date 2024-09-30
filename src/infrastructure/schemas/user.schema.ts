import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  userName: String,
  password: String,
});

export interface UserDocument extends Document {
  userName: string;
  password: string;
}
