import { Document, Types } from 'mongoose';
export default interface IEtablissement extends Document {
    name: String;
    adress: String;
    zip: Number;
    city: String;
    location: {
        lng: Number;
        lat: Number;
    };
    logo: {
        type: Object;
    };
    collectivities: [
        {
            type: Types.ObjectId;
            ref: 'Collectivity';
        }
    ];
    conventions: [
        {
            type: Types.ObjectId;
            ref: 'Convention';
        }
    ];
    utilisateurs: [
        {
            type: Types.ObjectId;
            ref: 'Utilisateur';
        }
    ];
    partenaire: [
        {
            type: Types.ObjectId;
            ref: 'Partenaire';
        }
    ];
    usagers: [
        {
            type: Types.ObjectId;
            ref: 'Usager';
        }
    ];
    entreprises: [
        {
            type: Types.ObjectId;
            ref: 'Entreprise';
        }
    ];
    Prospectings: [
        {
            type: Types.ObjectId;
            ref: 'Prospecting';
        }
    ];
    rooms: [
        {
            type: Types.ObjectId;
            ref: 'Room';
        }
    ];
    conventionArchiveds: [
        {
            type: Types.ObjectId;
            ref: 'ConventionArchived';
        }
    ];
    utillisateurArchiveds: [
        {
            type: Types.ObjectId;
            ref: 'UtilisateurArchived';
        }
    ];
    UsagerOuts: [
        {
            type: Types.ObjectId;
            ref: 'Usager';
        }
    ];
    collectivitiesArchived: [
        {
            type: Types.ObjectId;
            ref: 'CollectivityArchived';
        }
    ];
    roomArchiveds: [
        {
            type: Types.ObjectId;
            ref: 'RoomArchived';
        }
    ];
    token: String;
}
