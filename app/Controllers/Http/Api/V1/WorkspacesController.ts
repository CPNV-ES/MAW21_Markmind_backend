import { HttpContext } from '@adonisjs/core/build/standalone'
import Workspace from 'App/Models/Workspace'

export default class WorkspacesController {
  public async index({} : HttpContext) {
    const workspaces = await Workspace.all()
    return workspaces
  }

  public async show({ params, response }: HttpContext) {
    const workspace = await Workspace.find(params.id)
    if(!workspace) {
      return response.notFound()
    }
    return workspace
  }

  public async store({ request }: HttpContext) {
    const workspace = await Workspace.create({ name: request.input('name') })
    return workspace
  }

  public async update({ response, request, params }: HttpContext) {
    const workspace = await Workspace.find(params.id)
    if(!workspace) {
      return response.notFound()
    }
    workspace.name = request.input('name')
    await workspace.save()
    return workspace
  }

  public async destroy({params, response}: HttpContext) {
    const workspace = await Workspace.find(params.id)
    if(!workspace) {
      return response.notFound()
    }
    await workspace.delete()
    return response.status(204)
  }

}
