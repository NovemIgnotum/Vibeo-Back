import { Document, Types } from 'mongoose';

export interface IPlaylist extends Document {
    owner: Types.ObjectId;
    name: string;
    tracks: Types.Array<Types.ObjectId>;
    cover: string;
    createdAt: Date;
    updatedAt: Date;
}
