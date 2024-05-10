import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])], // Thêm dòng này
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}