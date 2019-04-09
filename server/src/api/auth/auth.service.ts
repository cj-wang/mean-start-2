import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../../../shared/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginRequest: any) {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const user: JwtPayload = {
      name: loginRequest.email.split('@')[0],
      email: loginRequest.email,
    };
    const expiresIn = process.env.JWT_EXPIRES || 3600;
    const accessToken = this.jwtService.sign(user, {
      expiresIn,
    });
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // Put some validation logic here
    // for example query user by id/email/username
    return payload;
  }

  async logout() {
    // Remove token
  }

}
