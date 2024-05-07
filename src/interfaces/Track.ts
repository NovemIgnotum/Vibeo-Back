import { Document, Types } from 'mongoose';

export interface Track extends Document {
    title: string;
    duration: number;
    band: Types.ObjectId;
}
