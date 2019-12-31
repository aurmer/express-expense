const express = require('express');
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
