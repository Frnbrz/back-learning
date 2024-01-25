import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorators'
import { Role } from '../enums/rol.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!role) return true

    const { user } = context.switchToHttp().getRequest()

    return role === user.role
  }
}
