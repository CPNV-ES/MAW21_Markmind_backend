import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'collections'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.integer('workspace_id').unsigned().references('id').inTable('workspaces').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.raw('CURRENT_TIMESTAMP'))
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
