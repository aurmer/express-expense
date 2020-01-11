exports.up = function(knex) {
  return knex.schema.table('expense_item', table => {
    table.integer('bucket_id').unsigned();
    table.foreign('bucket_id').references('buckets_categories.id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('expense_item', table => {
    table.dropColumn('bucket_id');
  });
};
