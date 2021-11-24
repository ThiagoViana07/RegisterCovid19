
exports.up = function (knex) {
  return knex.schema.createTable('vaccine', function (table) {
    table.increments()
    table.string('laboratory').notNullable();
    table.string('batch')
    table.timestamps()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('vaccine')

};
