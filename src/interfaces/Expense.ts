import { Schema, Document, model } from 'mongoose';

export default interface IExpense extends Document {
    date: Number;
    pattern: String;
    price: Number;
    picture: Object;
}
