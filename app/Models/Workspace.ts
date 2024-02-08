import { DateTime } from 'luxon'
import { BaseModel, HasMany, hasMany, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Collection from './Collection'
import User from './User'

export default class Workspace extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => Collection)
  public collections: HasMany<typeof Collection>

  @column()
  public userId: number
  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
