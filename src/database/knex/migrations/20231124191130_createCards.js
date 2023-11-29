
exports.up = knex => knex.schema.createTable('cards', table => {
    table.increments('id').primary().notNullable()
    table.float('balance')
    table.text('card_name').notNullable()
    table.timestamp('created_at').default(knex.fn.now())
    table.integer('created_by').references('id').inTable('users')
})

exports.down = knex => knex.schema.dropTable('cards')
