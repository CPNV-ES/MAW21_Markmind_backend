import { DateTime } from 'luxon'
import { BaseModel, HasMany, hasMany, column } from '@ioc:Adonis/Lucid/Orm'
import Collection from './Collection'

export default class Workspace extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => Collection)
  public collections: HasMany<typeof Collection>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
