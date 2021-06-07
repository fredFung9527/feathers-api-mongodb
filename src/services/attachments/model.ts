import { model, Schema, Document, Types } from 'mongoose';

export interface Attachment extends Document {
  name: string,
  path: string,
  description: string,
  user: Types.ObjectId,
  createdAt: Date,
};

const schema: Schema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  description: { type: String },
  user: { type: Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, required: true },
});

export default model<Attachment>('Attachment', schema);