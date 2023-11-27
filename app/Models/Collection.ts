import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Workspace from './Workspace'

export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasOne(() => Workspace)
  public workspace: HasOne<typeof Workspace>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
