const express = require('express');
const APP = express();
const PORT = process.env.PORT || 3000;
const { db } = require('./db/dbConnection');

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

APP.listen(PORT, () => console.log(`Expense App listening on port ${PORT}!`));
