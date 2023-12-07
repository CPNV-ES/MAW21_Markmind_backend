import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCollectionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    content: schema.string(),
    collectionId: schema.number([
      rules.exists({ table: 'collections', column: 'id' })
    ])
  })

  public messages: CustomMessages = {}
}
