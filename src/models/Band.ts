import { Schema, model } from 'mongoose';
import { Band } from '../interfaces/Band';

const bandSchema = new Schema<Band>({
    name: { type: String, required: true },
    genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
    members: [{ type: String, required: true }],
    albums: [{ type: Schema.Types.ObjectId, ref: 'Album' }]
});

const Band = model<Band>('Band', bandSchema);
export default Band;
