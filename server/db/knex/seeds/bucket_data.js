exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('buckets_categories')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('buckets_categories').insert([
				{
					bucket_name: 'DigitalCrafts Expenses',
					total_number_of_expenses: 1,
				},
			]);
		});
};
