import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/User';

const userSchema = new Schema<IUser>({
    pseudo: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    tokenVersion: { type: Number, default: 0 },
    role: { type: String, default: 'user' }
});

const User = model<IUser>('User', userSchema);
export default User;
