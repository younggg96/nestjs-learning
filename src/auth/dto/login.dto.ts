import RegisterDto from './register.dto';
import { PartialType } from '@nestjs/mapped-types';

export default class LoginDto extends PartialType(RegisterDto) {}
