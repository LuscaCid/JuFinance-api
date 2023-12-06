
exports.up = knex => knex.schema.createTable('bills', table => {
    table.increments('id') // esse id sera buscado ao renderiar as contas do usuario ou dos usuarios, ou seja
    table.text('title').notNullable()
    table.text('description')
    table.float('value') // value of the current bill 
    table.integer('created_by').references('id').inTable('users')//ao criar a conta, tera o usuario que criou a conta
    table.text('maturity')
    table.text('status').defaultTo('pending')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
    
})


exports.down = knex => knex.schema.dropTable('bills')
