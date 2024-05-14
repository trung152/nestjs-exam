import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
    return 'success';
  }
}
