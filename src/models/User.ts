import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/User';

const userSchema = new Schema<IUser>({
    account: {
        name: { type: String, required: true },
        firstname: { type: String, required: true }
    },
    pseudo: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'user' },
    profilePicture: { type: String, default: '' },
    backgroundPicture: { type: String, default: '' },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    tokenVersion: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    playlist: [{ type: Schema.Types.ObjectId }]
});

const User = model<IUser>('User', userSchema);
export default User;
