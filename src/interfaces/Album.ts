import { Document, Types } from 'mongoose';

export interface Album extends Document {
    name: string;
    band: Types.ObjectId;
    tracks: Types.ObjectId[];
}
