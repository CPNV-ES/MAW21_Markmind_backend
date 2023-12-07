import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Collection from 'App/Models/Collection'
import CreateCollectionValidator from 'App/Validators/CreateCollectionValidator'
import UpdateCollectionValidator from 'App/Validators/UpdateCollectionValidator'

export default class CollectionsController {
  
  public async index({}: HttpContextContract) {
    const collections = await Collection.all()
    return collections
  }

  public async show({ params, response }: HttpContextContract) {
    const collection = await Collection.find(params.id)
    if(!collection) {
      return response.notFound()
    }
    await collection.load('workspace')
    return collection
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateCollectionValidator)
    const collection = await Collection.create(payload)
    await collection.load('workspace')
    return collection
  }

  public async update({ response, request, params }: HttpContextContract) {
    const payload = await request.validate(UpdateCollectionValidator)
    const collection = await Collection.find(params.id)
    if(!collection) {
      return response.notFound()
    }
    await collection.merge(payload).save()
    await collection.load('workspace')
    return collection
  }

  public async destroy({params, response}: HttpContextContract) {
    const collection = await Collection.find(params.id)
    if(!collection) {
      return response.notFound()
    }
    await collection.delete()
    return response.status(204)
  }

}
