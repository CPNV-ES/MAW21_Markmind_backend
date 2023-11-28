import { HttpContext } from '@adonisjs/core/build/standalone'
import Workspace from 'App/Models/Workspace'
import CreateWorkspaceValidator from 'App/Validators/CreateWorkspaceValidator'
import UpdateWorkspaceValidator from 'App/Validators/UpdateWorkspaceValidator'

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
    const payload = await request.validate(CreateWorkspaceValidator)
    const workspace = await Workspace.create(payload)
    return workspace
  }

  public async update({ response, request, params }: HttpContext) {
    const payload = await request.validate(UpdateWorkspaceValidator)
    const workspace = await Workspace.find(params.id)
    if(!workspace) {
      return response.notFound()
    }
    await workspace.merge(payload)
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
