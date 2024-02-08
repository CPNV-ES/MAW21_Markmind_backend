/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Collection from 'App/Models/Collection'
import Resource from 'App/Models/Resource'
import User from 'App/Models/User'
import Workspace from 'App/Models/Workspace'

export const { actions } = Bouncer
.define('useWorkspace', (user: User, workspace: Workspace) => {
  return user.id === workspace.userId
})
.define('useCollection', (user: User, collection: Collection) => {
  return user.id === collection.userId
})
.define('useResource', (user: User, resource: Resource) => {
  return user.id === resource.userId
})

export const { policies } = Bouncer.registerPolicies({})
