import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCollectionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    workspaceId: schema.number.optional([
      rules.exists({ table: 'workspaces', column: 'id' })
    ])
  })

  public messages: CustomMessages = {}
}
