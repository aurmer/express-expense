require('dotenv').config();
const express = require('express');
var cors = require('cors')
const APP = express();
const PORT = process.env.PORT || 3000;
const { db } = require('./db/dbConnection');

APP.use(cors())

function testUsersCall() {
	const userTableQuery = `
      SELECT *
        FROM users
    `;

	return db.raw(userTableQuery);
}

function testExpenseCall() {
	const expenseTableQuery = `
      SELECT *
        FROM expense_item
    `;

	return db.raw(expenseTableQuery);
}

function testBucketCall() {
	const bucketableQuery = `
      SELECT *
        FROM buckets_categories
    `;

	return db.raw(bucketableQuery);
}

function getExpenses(userId) {
  return db.select('receipt_name', 'transaction_detail', 'amount', 'expense_date', 'status', 'tags')
    .from('expense_item')
    .where({
      'user_id':userId
    })
}

testUsersCall().then(response => {
	console.log(response.rows);
});

testExpenseCall().then(response => {
	console.log(response.rows);
});

testBucketCall().then(response => {
	console.log(response.rows);
});

APP.get('/', (req, res) => res.send('Hello World!'));

APP.get('/get-user', (req, res, next) => {
  testUsersCall().then(response => {
    res.send(response)
  })
})

APP.get('/get-expenses:id', (req, res) => {
  console.log('incoming request for expenses for userId: ' + req.params.id)
  getExpenses(req.params.id).then(expenses => {
    res.send(expenses)
  })
})

APP.listen(PORT, () => console.log(`Expense App listening on port ${PORT}!`));
