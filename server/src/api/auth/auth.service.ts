import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../../../shared/jwt-payload.interface';

@Injectable()
export class AuthService {

  private expiresIn: number;

  constructor(private readonly jwtService: JwtService) {
    this.expiresIn = process.env.JWT_EXPIRES || 3600;
  }

  async login(loginRequest: any) {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const user: JwtPayload = {
      name: loginRequest.email.split('@')[0],
      email: loginRequest.email,
    };
    const accessToken = this.jwtService.sign(user, {
      expiresIn: this.expiresIn,
    });
    return {
      expiresIn: this.expiresIn,
      accessToken,
    };
  }

  async refreshToken(refreshTokenRequest: any) {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a new token once you verify the refresh token
    const user = this.jwtService.verify(refreshTokenRequest.token, {
      ignoreExpiration: true,
    });
    delete user.iat;
    delete user.exp;
    const accessToken = this.jwtService.sign(user, {
      expiresIn: this.expiresIn,
    });
    return {
      expiresIn: this.expiresIn,
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
