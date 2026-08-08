exports.up = function (knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.string('order_code', 20).notNullable().unique();
    table.string('customer_name', 120).notNullable();
    table.string('customer_phone', 20).notNullable();
    table.text('delivery_address').notNullable();
    table.text('notes').notNullable().defaultTo('');
    table.jsonb('items').notNullable();
    table.decimal('subtotal', 10, 2).notNullable();
    table
      .enu('status', ['new', 'contacted', 'confirmed', 'fulfilled', 'cancelled'], {
        useNative: true,
        enumName: 'order_status',
      })
      .notNullable()
      .defaultTo('new');
    table.enu('fulfillment_channel', ['whatsapp', 'swiggy', 'zomato', 'other'], {
      useNative: true,
      enumName: 'fulfillment_channel',
    }).notNullable().defaultTo('whatsapp');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('orders')
    .then(() => knex.raw('DROP TYPE IF EXISTS order_status'))
    .then(() => knex.raw('DROP TYPE IF EXISTS fulfillment_channel'));
};
