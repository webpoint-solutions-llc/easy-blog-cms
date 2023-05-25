import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class LinkedinAuthStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: `${process.env.LINKEDIN_CALLBACK_URL}`,
            scope: ['r_emailaddress', 'r_liteprofile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            fullName: name.givenName + ' ' + name.familyName,
            picture: photos[0].value,
            accessToken,
            refreshToken,
        };
        done(null, user);
    }
}
