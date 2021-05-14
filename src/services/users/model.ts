import { model, Schema, Document } from 'mongoose';
export interface User extends Document {
  email: string;
  password: string,
  firstName: string;
  lastName: string;
  role: Role
}

export enum Role {
  User = 0,
  Admin = 99
}

const schema: Schema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: Number, enum: [0, 99], default: 0, required: true },
});

export default model<User>('User', schema);