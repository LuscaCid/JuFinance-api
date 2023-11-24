
exports.up = knex => knex.schema.createTable('users_has_bills', table => {
    table.increments('id').notNullable()
    table.integer('user_id').references('id').inTable('users')
    table.integer('bill_id').references('id').inTable('bills')
})

exports.down = knex => knex.schema.dropTable('users_has_bills')
