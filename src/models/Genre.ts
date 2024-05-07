import { Schema, model } from 'mongoose';
import { Genre } from '../interfaces/Genre';

const genreSchema = new Schema<Genre>({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const Genre = model<Genre>('Genre', genreSchema);
export default Genre;
