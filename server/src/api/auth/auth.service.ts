import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }

  async refreshToken(token: any) {
    const user = this.jwtService.verify(token, {
      ignoreExpiration: true,
    });
    if (Date.now() > (user.exp + jwtConstants.expiresIn) * 1000) {
      throw new UnauthorizedException('Token expired');
    }
    delete user.iat;
    delete user.exp;
    return this.login(user);
  }

  async logout() {
    // Remove token
  }

}
