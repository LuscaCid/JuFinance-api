
exports.up = knex => knex.schema.createTable('last_payments', table => {
  table.increments('id').notNullable().primary()
  table.integer('user_id').references('id').inTable('users')
  table.integer('payment_id').references('id').inTable('payments')
})


exports.down = knex => knex.schema.dropTable('last_payments')
