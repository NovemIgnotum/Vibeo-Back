import { Document, Types } from 'mongoose';

export interface Track extends Document {
    title: string;
    band: Types.ObjectId;
    genre: Types.ObjectId;
    track: string;
}
