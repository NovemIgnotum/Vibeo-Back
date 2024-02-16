import { Schema, model } from 'mongoose';
import IContact from '../interfaces/Contact';

const contact = new Schema<IContact>(
    {
        dateContact: { type: Date, required: true },
        // echange, convocation ou saisine
        typeContact: { type: String, required: true },
        // visio, tel, physique
        natureContact: { type: String, required: true },
        // commentaires
        contenuContact: { type: String, required: true },
        utilisateur: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Utilisateur' // est egal à la personne contactée
            }
        ],
        usager: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager' // est egal à la personne contactée
            }
        ],
        interlocutor: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Interlocutor' // est egal à la personne contactée
            }
        ],
        partenaire: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Partenaire' // est egal à la personne contactée
            }
        ]
    },
    {
        timestamps: true
    }
);

const Contact = model<IContact>('Contact', contact);
export default Contact;
