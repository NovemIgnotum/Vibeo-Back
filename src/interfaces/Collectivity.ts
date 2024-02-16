import { Types, Document } from 'mongoose';

export interface ICollectivity extends Document {
    name: String;
    address: String;
    zip: Number;
    city: String;
    location: {
        lng: Number;
        lat: Number;
    };
    partenaires: [
        {
            type: Types.ObjectId;
            ref: 'Partenaire';
        }
    ];
    partenairesArchived: [
        {
            type: Types.ObjectId;
            ref: 'PartenaireArchived';
        }
    ];
    usagers: [{ type: Types.ObjectId; ref: 'Usager' }];
    usagersOuted: [{ type: Types.ObjectId; ref: 'Usager' }];
}
