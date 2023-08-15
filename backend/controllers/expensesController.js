const Expense = require('../models/expensesModel');
const mongoose = require('mongoose');

const getExpenses = async(req,res) => {
    const expenses = await Expense.find({}).sort({ExpenseDate: -1})

    res.status(200).json(expenses)
}

const getExpense = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such record' });
    }
  
    const expense = await Expense.findById(id);
  
    if (!expense) {
      return res.status(404).json({ error: 'No such record' });
    }
  
    res.status(200).json(expense);
  };

const createExpense = async (req,res) => {
    const { Title, Category, Description, Amount, ExpenseDate } = req.body;

    let emptyFields = [];

  if (!total > 0) {
    emptyFields.push('total');
    return res.status(400).json({ error: 'Invalid total', emptyFields });
  }
  if (!Title) {
    emptyFields.push('Title');
  }
  if (!Category) {
    emptyFields.push('Category');
  }
  if (!Amount) {
    emptyFields.push('Amount');
  }
  if (!ExpenseDate) {
    emptyFields.push('ExpenseDate');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

    try {
        const expense = await Expense.create({
            Title, Category, Description, Amount, ExpenseDate 
        });
        res.status(200).json(expense);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const updateExpense  = async(req,res) => {
    const { id } = req.params;
    const { Title, Category, Description, Amount, ExpenseDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such record in database' });
    }

    const expense = await Expense.findOneAndUpdate(
        {_id:id },
        {
            ...req.body,
        }
    );

    if(!expense) {
        return res.status(400).json({ error: 'No such record' });
    }

    return res.status(200).json(expense);
};

const deleteExpense = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such record in database' });
    }
  
    const expense = await Expense.findByIdAndDelete({ _id: id });
  
    if (!expense) {
      return res.status(400).json({ error: 'No such record' });
    }
  
    res.status(200).json(expense);
  };
  

module.exports = {
    createExpense,
    getExpenses,
    getExpense,
    updateExpense,
    deleteExpense
}