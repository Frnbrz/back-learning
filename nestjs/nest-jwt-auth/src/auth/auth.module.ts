import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtSTrategy } from './dto/strategies/jwt.strategy'
import { LocalStrategy } from './dto/strategies/local.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1m' },
    })

  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtSTrategy]
})
export class AuthModule {}
