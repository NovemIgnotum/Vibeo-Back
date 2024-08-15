import { Document, Types } from 'mongoose';

export interface Genre extends Document {
    name: string;
    description: string;
    picture : string;
}
