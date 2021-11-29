import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { logger } from 'src/logger';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto, 'data received');
    const user = this.userRepository.create();
    const { username, pass, email, firstname, lastname, role } = createUserDto;
    const hashedpassword = await bcrypt.hash(pass, 10);
    const payload = { username, email, role };
    const jwt = await this.jwtService.signAsync(payload);
    user.username = username;
    user.password = hashedpassword;
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    user.role = role;
    user.access_token = jwt;
    console.log(jwt);

    const userdata = { ...user, jwt };
    const data = await this.userRepository.save(userdata);
    const { password, ...rest } = data;

    return rest;
  }
  async findOne(data) {
    try {
      const { username, pass } = data;
      const user = await this.userRepository.findOne({ username: username });
      if (!user) throw new NotFoundException('user not found');
      const found = await bcrypt.compare(pass, user.password);
      if (!found)
        throw new BadRequestException('incorrect user name or password');
      const { email, role } = user;
      user.access_token = await this.jwtService.signAsync({
        username,
        email,
        role,
      });
      const newData = await this.userRepository.save({
        username: username,
        ...user,
      });

      const { password, ...rest } = newData;
      return rest;
    } catch (error: any) {
      logger.error(error);
      throw new HttpException('Error ocuured', HttpStatus.NOT_MODIFIED);
    }
  }

  async findByid(id) {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (error) {
      logger.error(error);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new HttpException('Error occured', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number) {
    try {
      await this.userRepository.delete(id);
      return `user deleted successfully`;
    } catch (error) {
      logger.error(error);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
