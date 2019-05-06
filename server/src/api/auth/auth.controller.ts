import { Controller, Post, Delete, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginRequest: any): Promise<any> {
    return await this.authService.login(loginRequest);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenRequest: any): Promise<any> {
    return await this.authService.refreshToken(refreshTokenRequest);
  }

  @Delete('logout')
  async logout(): Promise<any> {
    return await this.authService.logout();
  }

}
