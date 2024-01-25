import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto/auth.dto'

const fakeUser = [
  {
    id: 1,
    username: 'test',
    password: 'test',
  },
  {
    id: 2,
    username: 'test2',
    password: 'test2',
  },

];



@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService) {
    
    
  }

  async validateUser({username, password}: AuthDto): Promise<string> {
    const user = fakeUser.find((user) => user.username === username);
    if (!user) return null

    if (user.password === password) {
      const {password, ...result} = user
      return this.jwtService.sign(result)
    }
  }

  async login({ username, password }: AuthDto): Promise<{ access_token: string }> {
    return { access_token: await this.validateUser({ username, password }) }
  }

  async createUser({ username, password }: AuthDto): Promise<string> {
    const user = fakeUser.find((user) => user.username === username);
    if (user) throw new HttpException('User already exists', 400)
    fakeUser.push({ id: fakeUser.length + 1, username, password })
    return this.jwtService.sign({ username, password })
  }
}
