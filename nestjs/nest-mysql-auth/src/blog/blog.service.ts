import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface'
import { Repository } from 'typeorm'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { Blog } from './entities/blog.entity'

@Injectable()
export class BlogService {

  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,


  ) { }

  async create(createBlogDto: CreateBlogDto, user: UserActiveInterface) {
    return await this.blogRepository.save({
      ...createBlogDto,
      userEmail: user.email
    })
  }

  async findAll() {
    return await this.blogRepository.find()
  }

  // async findAllByUser(user: UserActiveInterface) {
  //   return await this.blogRepository.find({
  //     where: {
  //       userEmail: user.email
  //     }
  //   })
  // }

  findOne(id: number) {
    return `This action returns a #${id} blog`
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`
  }

  remove(id: number) {
    return `This action removes a #${id} blog`
  }
}


