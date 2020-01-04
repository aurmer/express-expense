require('dotenv').config();
const express = require('express');
var cors = require('cors');
const APP = express();
APP.use(cors());
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }))
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
			// console.log(profile);
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
			profileFields: [
				'id',
				'email',
				'gender',
				'link',
				'locale',
				'name',
				'timezone',
				'updated_time',
				'verified',
			],
		},
		(accessToken, refreshToken, profile, done) => {
			// console.log(profile);

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

passport.serializeUser((user, done) => {
	console.log('serialize user - ', user)
	done(null, user);
});

passport.deserializeUser((id, done) => {
	console.log(id)
	done(null, id);
});

// SERVER API FUNCTIONS

function getUser(providerId) {
	return db('users').where({ 'users.providerId': providerId })
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
function getCategories(userId) {	
	return db('buckets_categories')
		.where({ 'buckets_categories.user_id': userId })
}
function postNewCategory(userId, category) {
	return db('buckets_categories')
		// .where({ 'buckets_categories.user_id': userId })
		.insert([{
			user_id: userId,
			bucket_name: category.bucket_name
		}])
}
function postNewExpense(userId, expense) {
	return db('expense_item')
		.where({ 'expense_item.user_id': userId })
		.insert([{ 
			receipt_name: expense.description,
			amount: expense.amount,
			expense_date: expense.date, 
			status: 'Not submitted',
			bucket_id: expense.bucket_id,
			user_id: userId
		}])
}

// SERVER API ROUTES

APP.get('/', (req, res) => res.send('Hello World! - /auth/google'));

APP.get('/get-user/:providerId', (req, res, next) => {
	getUser(req.params.providerId).then(response => {
		res.send(response);
	});
});

APP.get('/get-expenses/:providerId', (req, res) => {
	console.log('incoming request for expenses for providerId: ' + req.params.providerId);
	getUser(req.params.providerId)
		.then(user => {
			getExpenses(user[0].id)
				.then(expenses => {
				res.send(expenses);
			});
		})
});

APP.get('/get-categories/:providerId', (req, res) => {
	console.log('incoming request for categories for providerId: ' + req.params.providerId)
	getUser(req.params.providerId)
		.then(user => {
			getCategories(user[0].id)
				.then(categories => {
					console.log(categories)
					res.send(categories)
				})
		})
})
APP.post('/add-category/:providerId', (req, res) => {
	console.log(req.body)
	getUser(req.params.providerId)
	.then(user => {
		postNewCategory(user[0].id, req.body)
			.then(res.redirect('back'))
	})
})

APP.post('/add-expense/:providerId', (req, res) => {
	console.log(req.body)
	getUser(req.params.providerId)
		.then(user => {
			postNewExpense(user[0].id, req.body)
				.then(res.redirect('back'))
		})
})

//Authentication Routes//

//Google Auth//

APP.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/plus.login',
			'https://www.googleapis.com/auth/userinfo.email',
		],
	})
);

APP.get(
	'/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/auth' }),
	function(req, res) {
		res.redirect('/');
	}
);

//Facebook//

APP.get(
	'/auth/facebook',
	passport.authenticate('facebook', {
		scope: 'public_profile, email',
	})
);

APP.get(
	'/auth/facebook/callback',
	passport.authenticate('facebook', {
		//   successRedirect: '/',
		failureRedirect: '/auth',
	}),
	function(req, res) {
		res.redirect('/');
	}
);

APP.listen(PORT, () => console.log(`Expense APP listening on port ${PORT}!`));