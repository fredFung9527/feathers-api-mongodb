import mongoose, { Schema, Document } from 'mongoose';
import service from'feathers-mongoose';

export interface IUser extends Document {
  email: string;
  password: string,
  firstName: string;
  lastName: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

// Export the model and return your IUser interface
export default service({
  Model: mongoose.model<IUser>('User', UserSchema),
  lean: true, // set to false if you want Mongoose documents returned
  paginate: {
    default: 2,
    max: 4
  },
})