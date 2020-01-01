exports.up = function(knex) {
	return knex.schema.createTable('expense_item', table => {
		table.increments('id');
		table.string('receipt_name');
		table.string('transaction_detail');
		table.decimal('amount', null, 2);
		table.string('expense_date');
		table.string('status');
		table.string('tags');
		table.timestamps(true, true);
	});
};

exports.down = function(knex) {
	return knex.schema.raw('DROP TABLE expense_item');
};
