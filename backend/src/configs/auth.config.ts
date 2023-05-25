import { registerAs } from '@nestjs/config';
import { urlJoin } from '~/common/helper/helper.function';
// import ms from 'ms';
import { seconds } from '~/common/helper/constants/helper.function.constant';

export default registerAs(
    'auth',
    (): Record<string, any> => ({
        jwt: {
            accessToken: {
                secretKey:
                    process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY || '123456',
                expirationTime: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED
                    ? process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED
                    : '30m', // recommendation for production is 30m
                notBeforeExpirationTime: 0, // keep it in zero value
            },

            refreshToken: {
                secretKey:
                    process.env.AUTH_JWT_REFRESH_TOKEN_SECRET_KEY ||
                    '123456000',
                expirationTime: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRED
                    ? process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRED
                    : '7d', // recommendation for production is 7d
                expirationTimeRememberMe: process.env
                    .AUTH_JWT_REFRESH_TOKEN_REMEMBER_ME_EXPIRED
                    ? process.env.AUTH_JWT_REFRESH_TOKEN_REMEMBER_ME_EXPIRED
                    : '30d', // recommendation for production is 30d
                notBeforeExpirationTime: process.env
                    .AUTH_JWT_ACCESS_TOKEN_EXPIRED
                    ? process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED
                    : '30m', // recommendation for production is 30m
            },
        },

        password: {
            saltLength: 8,
            expiredInMs: seconds('182d'), // recommendation for production is 182 days
        },

        basicToken: {
            clientId: process.env.AUTH_BASIC_TOKEN_CLIENT_ID,
            clientSecret: process.env.AUTH_BASIC_TOKEN_CLIENT_SECRET,
        },

        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        linkedin: {
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: process.env.LINKEDIN_CALLBACK_URL,
            tokenURL: 'https://www.linkedin.com/oauth/v2/accessToken',
            userInfoURL: 'https://api.linkedin.com/v2/me',
            userEmailURL:
                'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        },
        saltLength: 8,
    })
);
