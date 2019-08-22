import { Controller, Get, Post, Delete, Request, Response, Body, UseGuards } from '@nestjs/common';
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

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin() {
    // GoogleStrategy to redirect to Google login page
  }

  @UseGuards(AuthGuard('google'))
  @Get('oauth2/callback')
  async googleCallback(@Request() req, @Response() res) {
    // Generate JWT token based on the OAuth2 logged in user
    const accessToken = (await this.authService.login(req.user)).accessToken;
    // Pass the token to client app
    res.redirect(`/auth/oauth2/callback?accessToken=${accessToken}`);
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
