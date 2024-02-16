import { Document, Types } from 'mongoose';

export default interface IContact extends Document {
    dateContact: Date;
    // echange, convocation ou saisine
    typeContact: String;
    // visio, tel, physique
    natureContact: String;
    // commentaires
    contenuContact: String;
    utilisateur: [
        {
            type: Types.ObjectId;
            ref: 'Utilisateur'; // est egal à la personne contactée
        }
    ];
    usager: [
        {
            type: Types.ObjectId;
            ref: 'Usager'; // est egal à la personne contactée
        }
    ];
    interlocutor: [
        {
            type: Types.ObjectId;
            ref: 'Interlocutor'; // est egal à la personne contactée
        }
    ];
    partenaire: [
        {
            type: Types.ObjectId;
            ref: 'Partenaire'; // est egal à la personne contactée
        }
    ];
}
