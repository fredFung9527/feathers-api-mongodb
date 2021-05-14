import { model, Schema, Document } from 'mongoose';
export interface IUser extends Document {
  email: string;
  password: string,
  firstName: string;
  lastName: string;
}

const schema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

export default model<IUser>('User', schema);