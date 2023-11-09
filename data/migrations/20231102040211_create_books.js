/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("books", (table)=>{
        table.increments();
        table.string("Titulo", 80).notNullable();
        table.string("Autor", 60).notNullable();
        table.integer("Ano", 4).notNullable();
        table.decimal("Preco", 9.2).notNullable();
        table.string("Foto", 100).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("books");
};
