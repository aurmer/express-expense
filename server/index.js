require('dotenv').config();
const fs = require("fs");
const express = require('express');
const session = require('express-session');
var cors = require('cors');
const util = require('util');
const APP = express();
APP.use(cors());
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const { db } = require('./db/dbConnection');
const mustache = require('mustache')
const passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const DOMAIN = process.env.DOMAIN;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const SESSION_SECRET = process.env.SESSION_SECRET;

const { findOrCreate } = require('./db/queryFunctions/userQuery');

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: `http://${DOMAIN}/auth/google/callback`,
		},
		(accessToken, refreshToken, profile, done) => {
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
			callbackURL: `http://${DOMAIN}/auth/facebook/callback`,
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
			findOrCreate(profile, function(err, user) {
				return done(err, user);
			});
		}
	)
);

// Authentication //

APP.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {},
	})
);

APP.use(passport.initialize());
APP.use(passport.session());

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

function ensureAuth(req, res, next) {
	console.log('user login status:', req.isAuthenticated());
	if (req.isAuthenticated()) {
		console.log('user id: ', req.user);
		next();
	} else {
		res.redirect('/login/');
	}
}

// Test DB Connections //

function getUser(userId) {
	return db('users').where({ 'users.id': userId });
}
function getExpenses(userId) {
	return db('buckets_categories')
		.where({ 'buckets_categories.user_id': userId })
		.join(
			'expense_item',
			'expense_item.bucket_id',
			'=',
			'buckets_categories.id'
		);
}
function getCategories(userId) {
	return db('buckets_categories').where({
		'buckets_categories.user_id': userId,
	});
}
function moveExpenseToPending(expenseIdArray) {
	// console.log(expenseIdArray)
	expenseIdArray.forEach(expenseId => {
		db('expense_item')
			.where({ id: expenseId })
			.update({ status: 'Pending' })
			.then(console.log('expenseId ' + expenseId + ' status set to Pending'));
	});
	return expenseIdArray;
}
function markExpenseAsPaid(expenseIdArray) {
	expenseIdArray.forEach(expenseId => {
		db('expense_item')
			.where({ id: expenseId })
			.update({ status: 'Paid' })
			.then(console.log('expenseId ' + expenseId + ' status set to Paid'))
	})
}
function postNewCategory(userId, category) {
	return (
		db('buckets_categories')
			// .where({ 'buckets_categories.user_id': userId })
			.insert([
				{
					user_id: userId,
					bucket_name: category.bucket_name,
				},
			])
	);
}
function postNewExpense(userId, expense) {
	return db('expense_item')
		.where({ 'expense_item.user_id': userId })
		.insert([
			{
				receipt_name: expense.receipt_name,
				amount: expense.amount,
				expense_date: expense.expense_date,
				status: 'Not submitted',
				bucket_id: expense.bucket_id,
				user_id: userId,
				receipt_img_path: expense.receipt_img_path
			},
		]);
}
function deleteExpense(expenseId) {
	return db('expense_item')
		.where({ 'expense_item.id': expenseId })
		.del()
		.then(console.log('expense id ' + expenseId + ' deleted'))
}

// SERVER API ROUTES

APP.get('*', (req, res, next) => {

	// console.log("NEW REQUEST:\n",req.originalUrl);
	next();
});

APP.get('/', ensureAuth, (req,res,next) => {
	res.redirect('/new-expense/');
})

APP.use('/login', express.static('public/login'));
APP.use('/privacy', express.static('public/privacy'));
APP.use('/app', ensureAuth, express.static('public/app'));
APP.use('/new-expense', ensureAuth, express.static('public/app'));
APP.use('/about', ensureAuth, express.static('public/app'))
APP.use('/dashboard', ensureAuth, express.static('public/app'))
APP.use('/404', ensureAuth, express.static('public/app'))




// DATABASE API ROUTES

APP.get('/get-user', ensureAuth, (req, res, next) => {
	getUser(req.user).then(response => {
		res.send(response);
	});
});
APP.get('/get-expenses', ensureAuth, (req, res) => {
	console.log('incoming request for expenses for user: ' + req.user);
	getExpenses(req.user).then(expenses => {
		res.send(expenses);
	});
});

APP.get('/get-categories', ensureAuth, (req, res) => {
	console.log('incoming request for categories for user: ', req.user);
	getCategories(req.user).then(categories => {
		res.send(categories);
	});
});
APP.post('/add-category', ensureAuth, (req, res) => {
	console.log('new category for user: ' + req.user);
	postNewCategory(req.user, req.body)
		.then(getCategories(req.user))
		.then(categories => {
			res.send(categories);
		});
});
APP.post('/add-expense', ensureAuth, (req, res) => {
	console.log('new expense for user: ', req.user);
	postNewExpense(req.user, req.body).then(res.send(console.log('success')));
});
APP.get('/generate-report', ensureAuth, (req, res) => {
	console.log('new report request for user: ', req.user);
	moveExpenseToPending(req.body);
	res.send(console.log('generate-report post done'));
});
APP.post('/mark-as-paid', ensureAuth, (req, res) => {
	console.log('user ' + req.user + ' marking expenses ' + req.body) + ' as paid';
	markExpenseAsPaid(req.body);
	res.send(console.log('mark-as-paid done'))
})
APP.post('/delete-expense', ensureAuth, (req, res) => {
	console.log('new request to delete expense id', req.body.id);
	deleteExpense(req.body.id);
	res.send(console.log('done'));
});

//Mustache Template Routes//

const reportPage = fs.readFileSync(
    './mustacheTemplates/report.mustache',
  	"utf8"
)

APP.get('/report/:slug'), (req, res) => {


}

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
	passport.authenticate('google', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/new-expense/');
	}
);

//Facebook Auth//

APP.get(
	'/auth/facebook',
	passport.authenticate('facebook', {
		scope: 'public_profile, email',
	})
);

APP.get(
	'/auth/facebook/callback',
	passport.authenticate('facebook', {
		failureRedirect: '/login',
	}),
	function(req, res) {
		res.redirect('/new-expense/');
	}
);

APP.get('/logout', function(req, res) {
	console.log(req.session);
	req.session.destroy(function(err) {
		res.redirect('/login/');
	});
});

APP.get('/error', (req, res) => res.send('error logging in'));

APP.use(function (req, res, next) {
	res.status(404)
	console.log(req.originalUrl)
	res.redirect('/404/')
  })

APP.listen(PORT, () => console.log(`Expense APP listening on port ${PORT}!`));
