import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { AuthGuard } from './guard/auth.guard'


interface RequestWithUser extends Request {
  user: {
    email: string
    role: string
  }
}

@Controller('auth')
export class AuthController {

  constructor(
    private	readonly  authService:	AuthService,
  ) {}

  
  @Post('login')
  async login(
    @Body()
    loginDto: LoginDto,

  ) {
    return await this.authService.login(loginDto)
  }

  @Post('register')
  async register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return await this.authService.register(registerDto)
  }
  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Req() req :RequestWithUser) {
    return await this.authService.profile(req.user)
  }

}