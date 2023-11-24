const config = require('../../../knexfile')
const knex = require('knex')
const connection = knex(config.development)

module.exports = connection //knex que vai ser utilizado para construir as consultas