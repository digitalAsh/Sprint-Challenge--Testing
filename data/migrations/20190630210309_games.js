
exports.up = function(knex) {
    return knex.schema.createTable('games', tbl => {
        tbl.increments();
  
        tbl.string('name', 255).notNullable();
        tbl.string('genre', 255).notNullable();
        tbl.integer('releaseYear').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('games')
};
