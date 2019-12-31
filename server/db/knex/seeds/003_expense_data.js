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
					bucket_id: 1,
					user_id: 1
				},
				{
					receipt_name: 'Energy Drinks',
					amount: 79,
					expense_date: '11/17/19',
					tags: 'Food',
					bucket_id: 1,
					user_id: 1
				},
				{
					receipt_name: 'Lunch with client',
					amount: 32,
					expense_date: '12/14/19',
					tags: 'Food',
					bucket_id: 2,
					user_id: 1
				}
			]);
		});
};
