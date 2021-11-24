
exports.up = function (knex) {
  return knex.schema.createTable('professional', function (table) {
    table.increments()
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.timestamps()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('professional')
};
