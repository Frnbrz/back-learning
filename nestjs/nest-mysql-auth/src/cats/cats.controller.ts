import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { Roles } from 'src/auth/decorators/roles.decorators'
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { ActiveUser } from 'src/common/decorators/active-user.decoraator'
import { Role } from 'src/common/enums/rol.enum'
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface'
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'


@Controller('cats')
@Roles(Role.USER)
@UseGuards(AuthGuard, RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Post()
  create(@Body() createCatDto: CreateCatDto, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.create(createCatDto, user)
  }

  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.catsService.findAll(user)
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.findOne(id, user)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.update(id, updateCatDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.remove(id, user)
  }
}
