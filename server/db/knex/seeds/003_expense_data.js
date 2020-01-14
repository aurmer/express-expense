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
          amount: 205.31,
          expense_date: '12/21/19',
          tags: 'Food',
          status: 'Not submitted',
          bucket_id: 1,
          user_id: 1,
        },
        {
          receipt_name: 'Energy Drinks',
          amount: 79.94,
          expense_date: '10/19/19',
          tags: 'Food',
          status: 'Paid',
          bucket_id: 1,
          user_id: 1,
        },
        {
          receipt_name: 'Lunch with client',
          amount: 34.12,
          expense_date: '11/23/19',
          tags: 'Food',
          status: 'Pending',
          bucket_id: 2,
          user_id: 1,
        },
        {
          receipt_name: 'Tacos for demo day',
          amount: 121.33,
          expense_date: '12/13/19',
          tags: 'Food',
          status: 'Pending',
          bucket_id: 1,
          user_id: 1,
        },
        {
          receipt_name: 'Coffee for team',
          amount: 17.73,
          expense_date: '12/18/19',
          tags: 'Food',
          status: 'Not submitted',
          bucket_id: 2,
          user_id: 1,
        },
      ]);
    });
};
