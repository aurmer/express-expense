require('dotenv').config();
const express = require('express');
var cors = require('cors')
const APP = express();
const PORT = process.env.PORT || 3000;
const { db } = require('./db/dbConnection');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('./googleCredentials')

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://www.example.com/auth/google/callback',
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOrCreate({ googleId: profile.id }, function(err, user) {
				return done(err, user);
			});
		}
	)
);

// Authentication //

APP.use(passport.initialize());
APP.use(passport.session());

APP.get('/success', (req, res) => res.send('you have successfully logged in'));
APP.get('/error', (req, res) => res.send('error logging in'));

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((obj, cb) => {
	cb(null, obj);
});

// Test DB Connections //

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
