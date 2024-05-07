import { Schema, model } from 'mongoose';
import { Track } from '../interfaces/Track';

const trackSchema = new Schema<Track>({
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    band: { type: Schema.Types.ObjectId, ref: 'Band', require: true }
});

const Track = model<Track>('Track', trackSchema);
export default Track;
