import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import RegisterDto from './dto/register.dto';
import { hash, verify } from 'argon2';
import LoginDto from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(dto: RegisterDto) {
    const password = await hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password,
      },
    });
    delete user.password;
    return user;
  }

  async login(dto: LoginDto) {
    console.log(dto);
    const user = await this.prisma.user.findFirst({
      where: {
        name: dto.name,
      },
    });
    if (!user) {
      throw new BadRequestException('user error');
    }
    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException('password error');
    }
    delete user.password;
    return user;
  }
}
