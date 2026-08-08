exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('SET NULL');
    table.string('name', 120).notNullable();
    table.string('slug', 140).notNullable().unique();
    table.text('description').notNullable().defaultTo('');
    table.text('ingredients').notNullable().defaultTo('');
    table.decimal('price', 10, 2).notNullable();
    table.string('image_emoji', 8).notNullable().defaultTo('🥤');
    table.string('benefit_tag', 60).notNullable().defaultTo('');
    table.boolean('is_active').notNullable().defaultTo(true);
    table.integer('sort_order').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products');
};
