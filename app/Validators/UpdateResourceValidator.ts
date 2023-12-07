import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCollectionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    content: schema.string.optional(),
    collectionId: schema.number.optional([
      rules.exists({ table: 'collections', column: 'id' })
    ])
  })

  public messages: CustomMessages = {}
}
