import { Document, Types } from 'mongoose';

export interface Band extends Document {
    name: string;
    genre: Types.ObjectId;
    members: string[];
    albums: Types.ObjectId[];
}
