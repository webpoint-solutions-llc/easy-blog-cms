import { HttpStatus, INestApplication } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { INTEGRATION_DATABASE_URL } from './database.constant';
import { HelperDateService } from '~/common/helper/services/helper.date.service';
import { AuthApiService } from '~/common/auth/services/auth.api.service';
import { CommonModule } from '~/common/common.module';
import { HttpModule } from '@nestjs/axios';
import { HealthModule } from '~/health/health.module';
import { HealthController } from '~/health/controllers/health.controller';

describe('Database Integration', () => {
    let app: INestApplication;
    let helperDateService: HelperDateService;
    let authApiService: AuthApiService;

    const apiKey = 'qwertyuiop12345zxcvbnmkjh';
    let xApiKey: string;
    let timestamp: number;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CommonModule, HealthModule, TerminusModule, HttpModule],
            controllers: [HealthController],
        }).compile();

        app = moduleRef.createNestApplication();
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

    it(`GET ${INTEGRATION_DATABASE_URL} Success`, async () => {
        const response = await request(app.getHttpServer())
            .get(INTEGRATION_DATABASE_URL)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.statusCode).toEqual(HttpStatus.OK);

        return;
    });

    afterAll(async () => {
        await app.close();
    });
});
