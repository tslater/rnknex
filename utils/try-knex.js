const knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: './data.db'
  }
})

export default knex
