const log = require('../logging.js');
const dbConfigs = require('../knexfile');
const db = require('knex')(dbConfigs.development);

function getUsers(slug) {
	const userTableQuery = `
      SELECT *
        FROM users
    `;
	return db.raw(userTableQuery);
}

function createNewUser(profile){
    db('users')
        .insert({ 
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            googleId: profile.id
        })
}

module.exports = {
	createNewUser: createNewUser,
};
