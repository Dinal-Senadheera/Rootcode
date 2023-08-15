const express = require('express');
const {createExpense, getExpenses, getExpense, updateExpense, deleteExpense} = require('../controllers/expensesController');

const router = express.Router();

// post expense
router.post('/', createExpense);

// get all expenses
router.get('/', getExpenses);

//get single expense
router.get('/:id', getExpense);

//update expense
router.patch('/:id', updateExpense);

//delete expense
router.delete('/:id', deleteExpense);

module.exports = router;