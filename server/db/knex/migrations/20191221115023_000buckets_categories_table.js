
exports.up = function(knex) {
    return knex.schema.createTable("buckets_categories", table => {
        table.increments("id");
        table.string("user_id");
        table.string("bucker_name");
        table.integer("total_number_of_expenses");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
  
};
