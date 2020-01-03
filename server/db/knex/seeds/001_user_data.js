exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('users').insert([
				{
					first_name: 'Chris',
					last_name: 'Oakman',
					email: 'chris@oakmac.com',
				},
			]);
		});
};
