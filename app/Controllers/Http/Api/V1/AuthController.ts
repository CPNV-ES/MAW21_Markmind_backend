import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {

  public async login({request, response, auth}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
  
    try {
      const token = await auth.attempt(email, password)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async register({request, auth}: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)
    const user = await User.create(payload);
    const token = await auth.login(user)
    return {
      token: token,
      user
    };
  }
}
