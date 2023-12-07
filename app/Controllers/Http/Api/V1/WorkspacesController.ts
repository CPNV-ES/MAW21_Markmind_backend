import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Workspace from 'App/Models/Workspace'
import CreateWorkspaceValidator from 'App/Validators/CreateWorkspaceValidator'
import UpdateWorkspaceValidator from 'App/Validators/UpdateWorkspaceValidator'

export default class WorkspacesController {
  public async index({} : HttpContextContract) {
    const workspaces = await Workspace.all()
    return workspaces
  }

  public async show({ params, response }: HttpContextContract) {
    const workspace = await Workspace.find(params.id)
    if(!workspace) {
      return response.notFound()
    }
    await workspace.load('collections')
    return workspace
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateWorkspaceValidator)
    const workspace = await Workspace.create(payload)
    return workspace
  }

  public async update({ response, request, params }: HttpContextContract) {
    const payload = await request.validate(UpdateWorkspaceValidator)
    const workspace = await Workspace.find(params.id)
    if(!workspace) {
      return response.notFound()
    }
    await workspace.merge(payload).save()
    return workspace
  }

  public async destroy({params, response}: HttpContextContract) {
    const workspace = await Workspace.find(params.id)
    if(!workspace) {
      return response.notFound()
    }
    await workspace.delete()
    return response.status(204)
  }

}
