import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User"
import CreateUserValidator from "App/Validators/CreateUserValidator"

export default class AuthController {
  
  public async login({auth, request, response}: HttpContextContract) {
    const {email, password} = request.only(['email', 'password'])
    try {
      const user = await User.findByOrFail('email', email)
      const token = await auth.use('jwt').attempt(email, password, {
        payload: {
          email: user.email
        }
      })
      return {
        type: token.type,
        token: token.accessToken,
        refresh_token: token.refreshToken,
        expire_at: token.expiresAt,
        user: {
          id: user.id,
          email: user.email,
          created_at: user.createdAt,
          updated_at: user.updatedAt
        }
      }
    } catch {
      return response.unauthorized({error: 'Invalid credentials'})
    }
  
  }

  public async register({ request }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)
    const user = await User.create(payload)
    return user
  }

  public async refresh({auth, request, response}: HttpContextContract) {
    const refreshToken = request.input('refresh_token')
    try {
      const jwt = await auth.use("jwt").loginViaRefreshToken(refreshToken);
      return {jwt}
    } catch {
      return response.unauthorized({ error: "Invalid refresh token"})
    }
  }

  public async logout({auth, response}: HttpContextContract) {
    await auth.use('jwt').revoke()
    return response.status(204)
  }
}
