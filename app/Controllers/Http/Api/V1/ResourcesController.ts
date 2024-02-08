import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Resource from 'App/Models/Resource'
import CreateResourceValidator from 'App/Validators/CreateResourceValidator'
import UpdateResourceValidator from 'App/Validators/UpdateResourceValidator'
import { toSnakeCase } from 'App/Helpers/string'

export default class ResourcesController {

  public async index({auth}: HttpContextContract) {
    const resources = await Resource.query().where('userId', auth.user!.id)
    return resources
  }

  public async show({ params, response, bouncer }: HttpContextContract) {
    const resource = await Resource.find(params.id)
    if(!resource) {
      return response.notFound()
    }
    await bouncer.authorize('useResource', resource)
    await resource.load('collection')
    return resource
  }

  public async store({ auth, request }: HttpContextContract) {
    const payload = await request.validate(CreateResourceValidator)
    const resource = await Resource.create({...payload, userId: auth.user!.id})
    await resource.load('collection')
    return resource
  }

  public async update({ response, request, params, bouncer }: HttpContextContract) {
    const payload = await request.validate(UpdateResourceValidator)
    const resource = await Resource.find(params.id)
    if(!resource) {
      return response.notFound()
    }
    await bouncer.authorize('useResource', resource)
    await resource.merge(payload).save()
    await resource.load('collection')
    return resource
  }

  public async destroy({params, response, bouncer}: HttpContextContract) {
    const resource = await Resource.find(params.id)
    if(!resource) {
      return response.notFound()
    }
    await bouncer.authorize('useResource', resource)
    await resource.delete()
    return response.status(204)
  }

  public async markdown({ params, response, bouncer } : HttpContextContract) {
    const resource = await Resource.find(params.id)
    if(!resource) {
      return response.notFound()
    }
    await bouncer.authorize('useResource', resource)
    response.type('.md')
    response.header('content-disposition', `inline; filename=${toSnakeCase(resource.name)}`)
    response.send(resource.content)
  }
  
}
