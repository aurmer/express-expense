exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('buckets_categories')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('buckets_categories').insert([
				{
					user_id: 1,
					bucket_name: 'DigitalCrafts',
					total_number_of_expenses: 2,
				},
				{
					user_id: 1,
					bucket_name: 'Luminare',
					total_number_of_expenses: 1
				}
			]);
		});
};
