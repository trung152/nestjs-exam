import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { provideCustomRepository } from 'utils/typeorm-ex.util';

@Module({
  imports: [
    JwtModule.register({
      secret: 'topSecret51', // Bearer token
      signOptions: { expiresIn: 3600 },
    }),
    TypeOrmModule.forFeature([UserRepository]), // Nhập UserRepository vào module
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository], // Liệt kê UserRepository là một provider
})
export class AuthModule {}
