import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { googleClient } from './constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: googleClient.clientID,
      clientSecret: googleClient.clientSecret,
      callbackURL: '/api/auth/oauth2/callback',
      scope: `profile email`,
      proxy: true,
    });
  }

  async validate(accessToken, refreshToken, profile) {
    // TODO: Validate or register the user locally
    return {
      userId: profile.id,
      name: profile.displayName,
      username: profile.emails[0].value,
      picture: profile.photos[0].value,
      roles: ['user'],
    };
  }
}
