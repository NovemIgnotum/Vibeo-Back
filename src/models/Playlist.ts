import { Schema, model } from 'mongoose';
import { IPlaylist } from '../interfaces/Playlist';

const playlistSchema = new Schema<IPlaylist>({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
    cover: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Playlist = model<IPlaylist>('Playlist', playlistSchema);
export default Playlist;
