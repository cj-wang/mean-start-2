import { Controller, Get, Request, Post, UseGuards, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenRequest: any): Promise<any> {
    return this.authService.refreshToken(refreshTokenRequest.token);
  }

  @Delete('logout')
  async logout(): Promise<any> {
    return this.authService.logout();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
