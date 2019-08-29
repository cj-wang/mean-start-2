import { Controller, Get, Post, Delete, Request, Response, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Response() res) {
    const loginResult = await this.authService.login(req.user);
    this.setAccessTokenCookie(res, loginResult.accessToken);
    res.send(loginResult);
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
    const loginResult = await this.authService.login(req.user);
    // Pass the token to client app
    this.setAccessTokenCookie(res, loginResult.accessToken);
    res.redirect(`/auth/oauth2/callback?accessToken=${loginResult.accessToken}`);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body,  @Response() res): Promise<any> {
    const loginResult = await this.authService.refreshToken(body.token);
    this.setAccessTokenCookie(res, loginResult.accessToken);
    res.send(loginResult);
  }

  @Delete('logout')
  async logout( @Response() res): Promise<any> {
    this.deleteAccessTokenCookie(res);
    res.send(this.authService.logout());
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  private readonly JWT_COOKIE_AGE = 365 * 24 * 60 * 60 * 1000;

  private setAccessTokenCookie(res, accessToken: string) {
    res.cookie('accessToken', accessToken, {
      maxAge: this.JWT_COOKIE_AGE,
    });
  }

  private deleteAccessTokenCookie(res) {
    res.cookie('accessToken', '', {
      maxAge: 0,
    });
  }

}
