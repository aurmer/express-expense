exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('expense_item')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('expense_item').insert([
				{
					receipt_name: 'Bahn Mi for Flex Class',
					transaction_detail: 'Purchased Bahn Mi for Saturday Class.',
					amount: 200.0,
					expense_date: '12/21/19',
					tags: 'Food',
				},
			]);
		});
};
