/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('workspaces', 'Api/V1/WorkspacesController').apiOnly()
  Route.resource('collections', 'Api/V1/CollectionsController').apiOnly()
})
.prefix('v1')
.prefix('api')