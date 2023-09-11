import { HttpStatus, INestApplication } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { useContainer } from 'class-validator';
import {
    E2E_ENUM_AUTH_ACCESS_FOR_URL,
    E2E_ENUM_MESSAGE_LANGUAGE_URL,
} from './enum.constant';
import { HelperDateService } from '~/common/helper/services/helper.date.service';
import { AuthApiService } from '~/common/auth/services/auth.api.service';
import { CommonModule } from '~/common/common.module';
import { RoutesEnumModule } from '~/router/routes/routes.enum.module';

describe('E2E Enum', () => {
    let app: INestApplication;
    let helperDateService: HelperDateService;
    let authApiService: AuthApiService;

    const apiKey = 'qwertyuiop12345zxcvbnmkjh';
    let xApiKey: string;
    let timestamp: number;

    beforeAll(async () => {
        const modRef = await Test.createTestingModule({
            imports: [
                CommonModule,
                RoutesEnumModule,
                RouterModule.register([
                    {
                        path: '/enum',
                        module: RoutesEnumModule,
                    },
                ]),
            ],
        }).compile();

        app = modRef.createNestApplication();
        useContainer(app.select(CommonModule), { fallbackOnErrors: true });
        helperDateService = app.get(HelperDateService);
        authApiService = app.get(AuthApiService);

        timestamp = helperDateService.timestamp();
        const apiEncryption = await authApiService.encryptApiKey(
            {
                key: apiKey,
                timestamp,

                hash: 'e11a023bc0ccf713cb50de9baa5140e59d3d4c52ec8952d9ca60326e040eda54',
            },
            'opbUwdiS1FBsrDUoPgZdx',
            'cuwakimacojulawu'
        );
        xApiKey = `${apiKey}:${apiEncryption}`;

        await app.init();
    });

    it(`GET ${E2E_ENUM_AUTH_ACCESS_FOR_URL} Success`, async () => {
        const response = await request(app.getHttpServer())
            .get(E2E_ENUM_AUTH_ACCESS_FOR_URL)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.statusCode).toEqual(HttpStatus.OK);
    });

    it(`GET ${E2E_ENUM_MESSAGE_LANGUAGE_URL} Success`, async () => {
        const response = await request(app.getHttpServer())
            .get(E2E_ENUM_MESSAGE_LANGUAGE_URL)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.statusCode).toEqual(HttpStatus.OK);
    });
    afterAll(async () => {
        await app.close();
    });
});
