exports.up = function(knex) {
	return knex.schema.createTable('users', table => {
		table.increments('id');
		table.string('first_name');
		table.string('last_name');
		table.string('email');
		table.string('provider')
		table.string('providerId');
		table.timestamps(true, true);
	});
};

exports.down = function(knex) {
	return knex.schema.raw('DROP TABLE users');
};
