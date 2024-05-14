import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Đặt isGlobal: true để ConfigModule có sẵn trong toàn bộ ứng dụng
      envFilePath: '.env', // Đường dẫn tới tệp .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // loại cơ sở dữ liệu
        host: configService.get<string>('DATABASE_HOST', 'localhost'), // hoặc tên dịch vụ Docker nếu bạn sử dụng Docker Compose
        port: configService.get<number>('DATABASE_PORT', 5432), // cổng mặc định của PostgreSQL
        username: configService.get<string>('DATABASE_USERNAME', 'postgres'), // tên người dùng (thay đổi nếu bạn đã đặt tên khác)
        password: configService.get<string>('DATABASE_PASSWORD', 'postgres'), // mật khẩu (thay đổi nếu bạn đã đặt mật khẩu khác)
        database: configService.get<string>('DATABASE_NAME', 'postgres'), // tên cơ sở dữ liệu
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // đường dẫn đến các entity
        synchronize: true, // đặt thành false khi triển khai sản phẩm
      }),
      inject: [ConfigService],
    }),
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
