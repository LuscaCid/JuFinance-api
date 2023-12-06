
exports.up = knex => knex.schema.createTable('invitations', (table) => {
    table.increments('id').primary().notNullable()
    table.integer('guest_id').references('id').inTable('users')//id do usuario que foi convidado a compartilhar
    table.integer('inviter_id').references('id').inTable('users')//id do usuario que foi convidado a compartilhar
    table.text('status').defaultTo("pending")
    table.text('message')
})

exports.down = knex => knex.schema.dropTable('invitations')
