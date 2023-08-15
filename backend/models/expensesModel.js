const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const expenseShema = new Schema({
    Title : {
        type: String,
        required:true
    },
    Category : {
        type: String,
        required:true
    },
    Description : {
        type: String,
        required: false
    },
    Amount: {
        type: Number,
        required: true
    },
    ExpenseDate: {
        type: Date,
        required: false
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseShema);