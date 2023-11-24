
exports.up = knex => knex.schema.createTable('cards', table => {
    table.increments('id').primary().notNullable()
    table.text('card_name').notNullable()
    table.timestamp('created_at').default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('cards')
