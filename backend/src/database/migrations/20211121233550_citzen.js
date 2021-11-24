
exports.up = function (knex) {
  return knex.schema.createTable('citizen', function (table) {
    table.increments()
    table.string('name').notNullable();
    table.boolean('first_dose', true)
    table.boolean('second_dose', false)
    table.date('next_dose')

    table.integer('vaccine_id').notNullable();
    table.integer('professional_id').notNullable();

    table.foreign('vaccine_id').references('id').inTable('vaccine')
    table.foreign('professional_id').references('id').inTable('professional')


    table.timestamps()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('citizen')

};
