import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  userName: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

export interface UserDocument extends Document {
  userName: string;
  password: string;
}
