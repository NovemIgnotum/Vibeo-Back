import { Document, Types } from 'mongoose';

export interface IUser extends Document {
    pseudo: string;
    email: string;
    password: string;
    name: string;
    firstName: string;
    tokenVersion: number;
    role: string;
    profilePicture: String;
    salt: string;
    hash: string;
    createdAt: Date;
    updatedAt: Date;
}
