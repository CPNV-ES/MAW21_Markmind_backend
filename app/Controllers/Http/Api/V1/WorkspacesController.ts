import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Workspace from "App/Models/Workspace";
import CreateWorkspaceValidator from "App/Validators/CreateWorkspaceValidator";
import UpdateWorkspaceValidator from "App/Validators/UpdateWorkspaceValidator";

export default class WorkspacesController {
  public async index({auth}: HttpContextContract) {
    const workspaces = await Workspace.query().where('userId', auth.user!.id)
    return workspaces;
  }

  public async show({ params, response, bouncer }: HttpContextContract) {
    const workspace = await Workspace.query()
      .where("id", params.id)
      .preload("collections", (collection) => {
        collection.preload("resources");
      })
      .first()

    if (!workspace) {
      return response.notFound();
    }
    await bouncer.authorize('useWorkspace', workspace)
    return workspace;
  }

  public async store({ auth, request }: HttpContextContract) {
    const payload = await request.validate(CreateWorkspaceValidator);
    const workspace = await Workspace.create({...payload, userId: auth.user!.id});
    return workspace;
  }

  public async update({ response, request, params, bouncer }: HttpContextContract) {
    const payload = await request.validate(UpdateWorkspaceValidator);
    const workspace = await Workspace.find(params.id);
    if (!workspace) {
      return response.notFound();
    }
    await bouncer.authorize('useWorkspace', workspace)
    await workspace.merge(payload).save();
    return workspace;
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const workspace = await Workspace.find(params.id);
    if (!workspace) {
      return response.notFound();
    }
    await bouncer.authorize('useWorkspace', workspace)
    await workspace.delete();
    return response.status(204);
  }
}
