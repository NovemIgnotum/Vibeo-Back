import { Schema, model } from 'mongoose';
import IExpense from '../interfaces/Expense';

const ExpenseSchema = new Schema<IExpense>(
    {
        date: Number,
        pattern: String,
        price: Number,
        picture: Object
    },
    {
        timestamps: true
    }
);

const Expense = model<IExpense>('Expense', ExpenseSchema);
export default Expense;
