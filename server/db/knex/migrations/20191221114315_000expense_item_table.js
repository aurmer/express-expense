
exports.up = function(knex) {
    return knex.schema.createTable("expense_item", table => {
        table.increments("id");
        table.string("receipt_name");
        table.string("transaction_detail");
        table.integer("amount");
        table.string("expense_date");
        table.string("entry_timestamp");
        table.string("bucket_catagory");
        table.string("tags");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
  
};
