import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { AuthService } from "src/auth/auth.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ username, password })
    if (!user) throw new UnauthorizedException()
    return user
  }

  async createUser(username: string, password: string): Promise<any> {
    const user = await this.authService.createUser({ username, password })
    if (!user) throw new UnauthorizedException()
    return user
  }
}