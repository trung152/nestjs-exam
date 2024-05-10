// src/posts/posts.controller.ts
import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { plainToClass } from 'class-transformer';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Post> {
    return this.postsService.findOne(id);
  }

  @HttpPost()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createPostDto: CreatePostDto): Promise<Post> {
    const postEntity = plainToClass(Post, createPostDto);
    return this.postsService.create(postEntity);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() post: Partial<Post>): Promise<Post> {
    return this.postsService.update(id, post);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.postsService.remove(id);
  }
}
