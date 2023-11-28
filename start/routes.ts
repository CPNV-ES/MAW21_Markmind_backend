/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('workspaces', 'Api/V1/WorkspacesController').apiOnly()
})
.prefix('v1')
.prefix('api')