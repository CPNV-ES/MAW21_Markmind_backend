/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.group(() => {
    Route.resource('workspaces', 'Api/V1/WorkspacesController').apiOnly()
    Route.resource('collections', 'Api/V1/CollectionsController').apiOnly()
    Route.resource('resources', 'Api/V1/ResourcesController').apiOnly()
    Route.get('/resources/:id/markdown', 'Api/V1/ResourcesController.markdown')
  })
  .middleware(['auth'])

  Route.post('/login', 'Api/V1/AuthController.login')
  Route.post('/register', 'Api/V1/AuthController.register')
  Route.post('/logout', 'Api/V1/AuthController.logout')
})
.prefix('v1')
.prefix('api')