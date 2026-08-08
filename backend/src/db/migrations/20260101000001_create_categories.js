exports.up = function (knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('name', 80).notNullable();
    table.string('slug', 80).notNullable().unique();
    table.integer('sort_order').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories');
};
