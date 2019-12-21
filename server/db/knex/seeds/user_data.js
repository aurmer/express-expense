exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('users').insert([
				{
					first_name: 'John',
					last_name: 'Doe',
					email: 'John.Doe@Gmail.com',
					token: 'test',
				},
			]);
		});
};
