import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt.guard'
import { LocalGuard } from './guards/local.guard'

@Controller('auth')
export class AuthController {
  
  constructor(private AuthService: AuthService) {
      
    }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return  req.user
  }

  @Post('signup')
  async signup(@Req() req: Request){
    return req.user
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user
  }


}
