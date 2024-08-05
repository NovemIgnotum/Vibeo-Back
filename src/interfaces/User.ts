import { Document, Types } from 'mongoose';

export interface IUser extends Document {
    account: {
        name: string;
        firstname: string;
    };
    pseudo: string;
    email: string;
    tokenVersion: number;
    role: string;
    profilePicture: String;
    backgroundPicture: String;
    salt: string;
    hash: string;
    createdAt: Date;
    updatedAt: Date;
}
