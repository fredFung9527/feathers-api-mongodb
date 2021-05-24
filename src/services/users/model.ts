import { model, Schema, Document } from 'mongoose';
export interface User extends Document {
  email: string;
  password: string,
  firstName: string;
  lastName: string;
  role: Role
};

export enum Role {
  User = 'user',
  Admin = 'admin'
};

const schema: Schema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user', required: true },
});

export default model<User>('User', schema);