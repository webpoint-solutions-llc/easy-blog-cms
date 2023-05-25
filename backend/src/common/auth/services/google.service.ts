import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class GoogleService {
    private outh2Client: OAuth2Client;
    private clientId: string;
    private clientSecret: string;

    constructor(private readonly config: ConfigService) {
        this.clientId = this.config.get('auth.google.clientID');
        this.clientSecret = this.config.get('auth.google.clientSecret');
    }

    async login(redirectUrl: string) {
        this.outh2Client = new OAuth2Client(
            this.clientId,
            this.clientSecret,
            redirectUrl
        );
        const url = this.outh2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['email', 'profile'],
        });

        return { url };
    }

    async getTokenFromGoogle(code: string): Promise<any> {
        if (!code) {
            throw new ForbiddenException('Code Not Found');
        }

        const data = await this.outh2Client.getToken(code);

        return data.tokens.id_token;
    }
}
