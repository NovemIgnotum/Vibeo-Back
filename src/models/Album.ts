import { Schema, model } from 'mongoose';
import { Album } from '../interfaces/Album';

const albumSchema = new Schema<Album>({
    name: { type: String, required: true },
    band: { type: Schema.Types.ObjectId, ref: 'Band', required: true },
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }]
});

const Album = model<Album>('Album', albumSchema);
export default Album;
