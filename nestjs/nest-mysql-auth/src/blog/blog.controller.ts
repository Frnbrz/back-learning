import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { Roles } from 'src/auth/decorators/roles.decorators'
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { ActiveUser } from 'src/common/decorators/active-user.decoraator'
import { Role } from 'src/common/enums/rol.enum'
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface'
import { BlogService } from './blog.service'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'

@Controller('blog')
@Roles(Role.USER)
@UseGuards(AuthGuard, RolesGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @ActiveUser() user: UserActiveInterface) {
    return this.blogService.create(createBlogDto, user)
  }

  @Get()
  findAll() {
    return this.blogService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.blogService.remove(id)
  }
}
