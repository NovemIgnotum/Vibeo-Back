import { Schema, model } from 'mongoose';
import { Track } from '../interfaces/Track';

const trackSchema = new Schema<Track>({
    title: { type: String, required: true },
    band: { type: Schema.Types.ObjectId, ref: 'Band' },
    genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
    track: { type: String, required: true }
});

const Track = model<Track>('Track', trackSchema);
export default Track;
