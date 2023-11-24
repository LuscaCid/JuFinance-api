
exports.up = knex => knex.schema.createTable('cards_has_users', table => {
    table.increments('id').primary().notNullable()
    table.integer('user_id').references('id').inTable('users')//esse registro linka um cartao a um usuario
    table.integer('card_id').references('id').inTable('cards')
})

exports.down = knex => knex.schema.dropTable('cards_has_users')
