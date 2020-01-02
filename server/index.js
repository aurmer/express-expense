require('dotenv').config();
const express = require('express');
var cors = require('cors');
const APP = express();
APP.use(cors());
const PORT = process.env.PORT || 3000;
const { db } = require('./db/dbConnection');
const passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const { findOrCreate } = require('./db/queryFunctions/userQuery');

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:9000/auth/google/callback',
		},
		(accessToken, refreshToken, profile, done) => {
			console.log(profile.displayName);
			findOrCreate(profile, function(err, user) {
				return done(err, user);
			});
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: FACEBOOK_APP_ID,
			clientSecret: FACEBOOK_APP_SECRET,
			callbackURL: 'http://localhost:9000/auth/facebook/callback',
		},
		(accessToken, refreshToken, profile, done) => {
			console.log(profile)

			findOrCreate(profile, function(err, user) {
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

function getUser(token) {
	return db('users').where({ 'users.token': token });
}

function getExpenses(userId) {
	return db('expense_item')
		.where({ 'expense_item.user_id': userId })
		.join(
			'buckets_categories',
			'expense_item.bucket_id',
			'buckets_categories.id'
		);
}

// testUsersCall().then(response => {
// 	console.log(response.rows);
// });

// testExpenseCall().then(response => {
// 	console.log(response.rows);
// });

// testBucketCall().then(response => {
// 	console.log(response.rows);
// });

APP.get('/', (req, res) => res.send('Hello World! - /auth/google'));

APP.get('/get-user', (req, res, next) => {
	testUsersCall().then(response => {
		res.send(response);
	});
});

APP.get('/get-expenses:id', (req, res) => {
	console.log('incoming request for expenses for userId: ' + req.params.id);
	getExpenses(req.params.id).then(expenses => {
		res.send(expenses);
	});
});

//Authentication Routes//

//Google Auth//

APP.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/plus.login'],
	})
);

APP.get(
	'/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/');
	}
);

//Facebook//

APP.get('/auth/facebook', passport.authenticate('facebook'));

APP.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/auth' }));

APP.listen(PORT, () => console.log(`Expense APP listening on port ${PORT}!`));
