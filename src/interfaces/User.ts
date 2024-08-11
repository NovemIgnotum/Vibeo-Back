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
    playlist: Types.ObjectId[];
    salt: string;
    hash: string;
    createdAt: Date;
    updatedAt: Date;
}
