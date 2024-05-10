import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // loại cơ sở dữ liệu
      host: 'localhost', // hoặc tên dịch vụ Docker nếu bạn sử dụng Docker Compose
      port: 5432, // cổng mặc định của PostgreSQL
      username: 'postgres', // tên người dùng (thay đổi nếu bạn đã đặt tên khác)
      password: 'postgres', // mật khẩu (thay đổi nếu bạn đã đặt mật khẩu khác)
      database: 'postgres', // tên cơ sở dữ liệu
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // đường dẫn đến các entity
      synchronize: true, // đặt thành false khi triển khai sản phẩm
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
