exports.up = function(knex) {
	return knex.schema.createTable('buckets_categories', table => {
		table.increments('id');
		table.integer('user_id').unsigned();
		table.foreign('user_id').references('users.id');
		table.string('bucket_name');
		table.integer('total_number_of_expenses');
		table.timestamps(true, true);
	});
};

exports.down = function(knex) {
	return knex.schema.raw('DROP TABLE buckets_categories');
};
