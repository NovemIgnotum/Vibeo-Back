import { Schema, model } from 'mongoose';
import IEtablissement from '../interfaces/Etablissement';

const etablissementSchema = new Schema<IEtablissement>(
    {
        name: { type: String, required: true },
        adress: { type: String, required: true },
        zip: { type: Number, required: true },
        city: { type: String, required: true },
        location: {
            lng: Number,
            lat: Number
        },
        logo: {
            type: Object
        },
        conventions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Convention'
            }
        ],
        collectivities: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Collectivity'
            }
        ],
        utilisateurs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Utilisateur'
            }
        ],
        partenaire: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Partenaire'
            }
        ],
        usagers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ],
        entreprises: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Entreprise'
            }
        ],
        Prospectings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Prospecting'
            }
        ],
        rooms: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Room'
            }
        ],
        conventionArchiveds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ConventionArchived'
            }
        ],
        utillisateurArchiveds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UtilisateurArchived'
            }
        ],
        UsagerOuts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ],
        collectivitiesArchived: [
            {
                type: Schema.Types.ObjectId,
                ref: 'CollectivityArchived'
            }
        ],
        roomArchiveds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'RoomArchived'
            }
        ]
    },
    {
        timestamps: true
    }
);

const Etablissement = model<IEtablissement>('Etablissement', etablissementSchema);
export default Etablissement;
