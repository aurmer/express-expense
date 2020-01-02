const log = require('../logging.js');
const {db} = require('../dbConnection')

function findOrCreate(profile, done){

db('users')
.where({ googleId: profile.id })
.then(res => {
    const user = res[0];
    if (!user) {
        db('users')
            .insert({
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                googleId: profile.id,
            })
            .catch(err => {
                console.error('Error creating new user - ', err);
            });
        return done(null, user);
    }
    if (user) {
        return done(null, user);
    }
})
.catch(err => {
    console.error('Local strategy error - ', err);
    return err;
});
}

module.exports = {
	findOrCreate: findOrCreate,
};
