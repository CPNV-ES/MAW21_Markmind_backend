import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {

  public async login({request, response, auth}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
  
    try {
      const token = await auth.use('api').attempt(email, password,{
        expiresIn: '7 days'
      })
      return {
        token: token,
        user: auth.user
      }
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async register({request, auth}: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)
    const user = await User.create(payload);
    const token = await auth.use('api').generate(user, {
      expiresIn: '7 days'
    })
    return {
      token: token,
      user
    };
  }
}
