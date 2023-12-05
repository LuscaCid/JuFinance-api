
exports.up = knex => knex.schema.createTable('payments', table => {//when makes an payment with success, regist
  table.increments('id').notNullable().primary()
  table.integer('bill_id').references('id').inTable('bills')
  table.timestamp('paid_at').default(knex.fn.now())
  table.text('payment_method').notNullable()
})

exports.down = knex => knex.schema.dropTable('payments')
