import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(data) {
    // console.log('this is data in userservie', data);
    const user = await this.userService.findOne(data);
    if (!user) {
      return null;
    }
    return user;
  }
}
