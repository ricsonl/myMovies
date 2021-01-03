import Knex from 'knex';

// cria a tabela de perfis

export async function up(knex: Knex){
  return knex.schema.createTable('profiles', table => {

    table.increments('id').primary();

    table.string('name').notNullable();
    
  })
}

export async function down(knex: Knex){
  return knex.schema.dropTable('profiles');
}