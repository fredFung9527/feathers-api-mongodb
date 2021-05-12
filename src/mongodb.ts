import { Application } from './declarations';
import mongoose from 'mongoose';

export default function (app: Application): void {
  const connection = app.get('mongodb');
  mongoose.connect(connection);
}
