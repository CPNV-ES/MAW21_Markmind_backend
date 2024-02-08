import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Collection from 'App/Models/Collection'
import CreateCollectionValidator from 'App/Validators/CreateCollectionValidator'
import UpdateCollectionValidator from 'App/Validators/UpdateCollectionValidator'

export default class CollectionsController {
  
  public async index({auth}: HttpContextContract) {
    const collections = await Collection.query().where('userId', auth.user!.id)
    return collections
  }

  public async show({ params, response, bouncer }: HttpContextContract) {
    const collection = await Collection.find(params.id)
    if(!collection) {
      return response.notFound()
    }
    await bouncer.authorize('useCollection', collection)
    await collection.load('workspace')
    return collection
  }

  public async store({ auth,request }: HttpContextContract) {
    const payload = await request.validate(CreateCollectionValidator)
    const collection = await Collection.create({...payload, userId: auth.user!.id})
    await collection.load('workspace')
    return collection
  }

  public async update({ response, request, params, bouncer }: HttpContextContract) {
    const payload = await request.validate(UpdateCollectionValidator)
    const collection = await Collection.find(params.id)
    if(!collection) {
      return response.notFound()
    }
    await bouncer.authorize('useCollection', collection)
    await collection.merge(payload).save()
    await collection.load('workspace')
    return collection
  }

  public async destroy({params, response, bouncer }: HttpContextContract) {
    const collection = await Collection.find(params.id)
    if(!collection) {
      return response.notFound()
    }
    await bouncer.authorize('useCollection', collection)
    await collection.delete()
    return response.status(204)
  }

}
