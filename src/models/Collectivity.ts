import { Schema, model } from 'mongoose';
import { ICollectivity } from '../interfaces/Collectivity';

const collectivitySchema = new Schema<ICollectivity>(
    {
        name: String,
        address: String,
        zip: Number,
        city: String,
        location: {
            lng: Number,
            lat: Number
        },
        partenaires: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Partenaire'
            }
        ],
        partenairesArchived: [
            {
                type: Schema.Types.ObjectId,
                ref: 'PartenaireArchived'
            }
        ]
    },
    {
        timestamps: true
    }
);

const Collectivity = model<ICollectivity>('Collectivity', collectivitySchema);
export default Collectivity;
