import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Resource from 'App/Models/Resource'
import CreateResourceValidator from 'App/Validators/CreateResourceValidator'
import UpdateResourceValidator from 'App/Validators/UpdateResourceValidator'

export default class ResourcesController {

  public async index({}: HttpContextContract) {
    const resources = await Resource.all()
    return resources
  }

  public async show({ params, response }: HttpContextContract) {
    const resource = await Resource.find(params.id)
    if(!resource) {
      return response.notFound()
    }
    await resource.load('collection')
    return resource
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateResourceValidator)
    const resource = await Resource.create(payload)
    await resource.load('collection')
    return resource
  }

  public async update({ response, request, params }: HttpContextContract) {
    const payload = await request.validate(UpdateResourceValidator)
    const resource = await Resource.find(params.id)
    if(!resource) {
      return response.notFound()
    }
    await resource.merge(payload).save()
    await resource.load('collection')
    return resource
  }

  public async destroy({params, response}: HttpContextContract) {
    const resource = await Resource.find(params.id)
    if(!resource) {
      return response.notFound()
    }
    await resource.delete()
    return response.status(204)
  }
  
}
