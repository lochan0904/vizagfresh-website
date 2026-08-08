exports.up = function (knex) {
  return knex.schema.createTable('admin_users', (table) => {
    table.increments('id').primary();
    table.string('email', 160).notNullable().unique();
    table.string('password_hash', 200).notNullable();
    table.string('name', 120).notNullable().defaultTo('Admin');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('admin_users');
};
