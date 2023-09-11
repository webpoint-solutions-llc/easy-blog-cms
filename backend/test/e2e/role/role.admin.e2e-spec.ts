import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import {
    E2E_ROLE_ADMIN_ACTIVE_URL,
    E2E_ROLE_ADMIN_CREATE_URL,
    E2E_ROLE_ADMIN_DELETE_URL,
    E2E_ROLE_ADMIN_GET_BY_ID_URL,
    E2E_ROLE_ADMIN_INACTIVE_URL,
    E2E_ROLE_ADMIN_LIST_URL,
    E2E_ROLE_ADMIN_UPDATE_URL,
    E2E_ROLE_PAYLOAD_TEST,
} from './role.constant';
import { connection, Types } from 'mongoose';
import { RouterModule } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AuthService } from '~/common/auth/services/auth.service';
import { RoleService } from '~/modules/role/services/role.service';
import { PermissionService } from '~/modules/permission/services/permission.service';
import { RoleBulkService } from '~/modules/role/services/role.bulk.service';
import { HelperDateService } from '~/common/helper/services/helper.date.service';
import { AuthApiService } from '~/common/auth/services/auth.api.service';
import { RoleDocument } from '~/modules/role/schemas/role.schema';
import { RoleCreateDto } from '~/modules/role/dtos/role.create.dto';
import { CommonModule } from '~/common/common.module';
import { RoutesAdminModule } from '~/router/routes/routes.admin.module';
import { PermissionDocument } from '~/modules/permission/schemas/permission.schema';
import { ENUM_ROLE_STATUS_CODE_ERROR } from '~/modules/role/constants/role.status-code.constant';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from '~/common/request/constants/request.status-code.constant';
import { ENUM_AUTH_PERMISSIONS } from '~/common/auth/constants/auth.enum.permission.constant';
import { ENUM_AUTH_ACCESS_FOR } from '~/common/auth/constants/auth.enum.constant';

describe('E2E Role Admin', () => {
    let app: INestApplication;
    let authService: AuthService;
    let roleService: RoleService;
    let permissionService: PermissionService;
    let roleBulkService: RoleBulkService;
    let helperDateService: HelperDateService;
    let authApiService: AuthApiService;

    let role: RoleDocument;
    let roleUpdate: RoleDocument;

    let accessToken: string;

    let successData: RoleCreateDto;
    let updateData: RoleCreateDto;
    let existData: RoleCreateDto;

    const apiKey = 'qwertyuiop12345zxcvbnmkjh';
    let xApiKey: string;
    let timestamp: number;

    beforeAll(async () => {
        const modRef = await Test.createTestingModule({
            imports: [
                CommonModule,
                RoutesAdminModule,
                RouterModule.register([
                    {
                        path: '/admin',
                        module: RoutesAdminModule,
                    },
                ]),
            ],
        }).compile();

        app = modRef.createNestApplication();
        useContainer(app.select(CommonModule), { fallbackOnErrors: true });
        authService = app.get(AuthService);
        roleService = app.get(RoleService);
        roleBulkService = app.get(RoleBulkService);
        permissionService = app.get(PermissionService);
        helperDateService = app.get(HelperDateService);
        authApiService = app.get(AuthApiService);

        const permissions: PermissionDocument[] =
            await permissionService.findAll({
                code: {
                    $in: [
                        ENUM_AUTH_PERMISSIONS.ROLE_READ,
                        ENUM_AUTH_PERMISSIONS.ROLE_CREATE,
                        ENUM_AUTH_PERMISSIONS.ROLE_UPDATE,
                        ENUM_AUTH_PERMISSIONS.ROLE_DELETE,
                        ENUM_AUTH_PERMISSIONS.PERMISSION_READ,
                        ENUM_AUTH_PERMISSIONS.PERMISSION_READ,
                        ENUM_AUTH_PERMISSIONS.PERMISSION_READ,
                        ENUM_AUTH_PERMISSIONS.PERMISSION_READ,
                    ],
                },
            });

        successData = {
            name: 'testRole1',
            permissions: permissions.map((val) => `${val._id}`),
            accessFor: ENUM_AUTH_ACCESS_FOR.ADMIN,
        };

        roleUpdate = await roleService.create({
            name: 'testRole2',
            permissions: permissions.map((val) => `${val._id}`),
            accessFor: ENUM_AUTH_ACCESS_FOR.ADMIN,
        });

        updateData = {
            name: 'testRole3',
            permissions: permissions.map((val) => `${val._id}`),
            accessFor: ENUM_AUTH_ACCESS_FOR.ADMIN,
        };

        existData = {
            name: 'testRole',
            permissions: permissions.map((val) => `${val._id}`),
            accessFor: ENUM_AUTH_ACCESS_FOR.ADMIN,
        };

        role = await roleService.create(existData);

        accessToken = await authService.createAccessToken({
            ...E2E_ROLE_PAYLOAD_TEST,
            loginDate: new Date(),
            rememberMe: false,
        });

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

    it(`GET ${E2E_ROLE_ADMIN_LIST_URL} List Success`, async () => {
        const response = await request(app.getHttpServer())
            .get(E2E_ROLE_ADMIN_LIST_URL)
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.statusCode).toEqual(HttpStatus.OK);

        return;
    });

    it(`GET ${E2E_ROLE_ADMIN_GET_BY_ID_URL} Get Not Found`, async () => {
        const response = await request(app.getHttpServer())
            .get(
                E2E_ROLE_ADMIN_GET_BY_ID_URL.replace(
                    ':_id',
                    `${new Types.ObjectId()}`
                )
            )
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.NOT_FOUND);
        expect(response.body.statusCode).toEqual(
            ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR
        );

        return;
    });

    it(`GET ${E2E_ROLE_ADMIN_GET_BY_ID_URL} Get Success`, async () => {
        const response = await request(app.getHttpServer())
            .get(E2E_ROLE_ADMIN_GET_BY_ID_URL.replace(':_id', role._id))
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.statusCode).toEqual(HttpStatus.OK);

        return;
    });

    it(`POST ${E2E_ROLE_ADMIN_CREATE_URL} Create Error Request`, async () => {
        const response = await request(app.getHttpServer())
            .post(E2E_ROLE_ADMIN_CREATE_URL)
            .send({
                name: 123123,
            })
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
        expect(response.body.statusCode).toEqual(
            ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR
        );

        return;
    });

    it(`POST ${E2E_ROLE_ADMIN_CREATE_URL} Create Exist`, async () => {
        const response = await request(app.getHttpServer())
            .post(E2E_ROLE_ADMIN_CREATE_URL)
            .send(existData)
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.body.statusCode).toEqual(
            ENUM_ROLE_STATUS_CODE_ERROR.ROLE_EXIST_ERROR
        );

        return;
    });

    it(`POST ${E2E_ROLE_ADMIN_CREATE_URL} Create Success`, async () => {
        const response = await request(app.getHttpServer())
            .post(E2E_ROLE_ADMIN_CREATE_URL)
            .send(successData)
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.CREATED);
        expect(response.body.statusCode).toEqual(HttpStatus.CREATED);

        return;
    });

    it(`PUT ${E2E_ROLE_ADMIN_UPDATE_URL} Update Error Request`, async () => {
        const response = await request(app.getHttpServer())
            .put(E2E_ROLE_ADMIN_UPDATE_URL.replace(':_id', roleUpdate._id))
            .send({
                name: [231231],
            })
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
        expect(response.body.statusCode).toEqual(
            ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR
        );

        return;
    });

    it(`PUT ${E2E_ROLE_ADMIN_UPDATE_URL} Update Not found`, async () => {
        const response = await request(app.getHttpServer())
            .put(
                E2E_ROLE_ADMIN_UPDATE_URL.replace(
                    ':_id',
                    `${new Types.ObjectId()}`
                )
            )
            .send(updateData)
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.NOT_FOUND);
        expect(response.body.statusCode).toEqual(
            ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR
        );

        return;
    });

    it(`PUT ${E2E_ROLE_ADMIN_UPDATE_URL} Update Exist`, async () => {
        const response = await request(app.getHttpServer())
            .put(E2E_ROLE_ADMIN_UPDATE_URL.replace(':_id', roleUpdate._id))
            .send(existData)
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.body.statusCode).toEqual(
            ENUM_ROLE_STATUS_CODE_ERROR.ROLE_EXIST_ERROR
        );

        return;
    });

    it(`PUT ${E2E_ROLE_ADMIN_UPDATE_URL} Update Success`, async () => {
        const response = await request(app.getHttpServer())
            .put(E2E_ROLE_ADMIN_UPDATE_URL.replace(':_id', roleUpdate._id))
            .send(updateData)
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.statusCode).toEqual(HttpStatus.OK);

        return;
    });

    it(`PATCH ${E2E_ROLE_ADMIN_INACTIVE_URL} Inactive, Not Found`, async () => {
        const response = await request(app.getHttpServer())
            .patch(
                E2E_ROLE_ADMIN_INACTIVE_URL.replace(
                    ':_id',
                    `${new Types.ObjectId()}`
                )
            )
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.NOT_FOUND);
        expect(response.body.statusCode).toEqual(
            ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR
        );

        return;
    });

    it(`PATCH ${E2E_ROLE_ADMIN_INACTIVE_URL} Inactive, success`, async () => {
        const response = await request(app.getHttpServer())
            .patch(E2E_ROLE_ADMIN_INACTIVE_URL.replace(':_id', roleUpdate._id))
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.statusCode).toEqual(HttpStatus.OK);

        return;
    });

    it(`PATCH ${E2E_ROLE_ADMIN_INACTIVE_URL} Inactive, already inactive`, async () => {
        const response = await request(app.getHttpServer())
            .patch(E2E_ROLE_ADMIN_INACTIVE_URL.replace(':_id', roleUpdate._id))
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.body.statusCode).toEqual(
            ENUM_ROLE_STATUS_CODE_ERROR.ROLE_ACTIVE_ERROR
        );

        return;
    });

    it(`PATCH ${E2E_ROLE_ADMIN_ACTIVE_URL} Active, Not Found`, async () => {
        const response = await request(app.getHttpServer())
            .patch(
                E2E_ROLE_ADMIN_ACTIVE_URL.replace(
                    ':_id',
                    `${new Types.ObjectId()}`
                )
            )
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.NOT_FOUND);
        expect(response.body.statusCode).toEqual(
            ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR
        );

        return;
    });

    it(`PATCH ${E2E_ROLE_ADMIN_ACTIVE_URL} Active, success`, async () => {
        const response = await request(app.getHttpServer())
            .patch(E2E_ROLE_ADMIN_ACTIVE_URL.replace(':_id', roleUpdate._id))
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.statusCode).toEqual(HttpStatus.OK);

        return;
    });

    it(`PATCH ${E2E_ROLE_ADMIN_ACTIVE_URL} Active, already active`, async () => {
        const response = await request(app.getHttpServer())
            .patch(E2E_ROLE_ADMIN_ACTIVE_URL.replace(':_id', roleUpdate._id))
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.body.statusCode).toEqual(
            ENUM_ROLE_STATUS_CODE_ERROR.ROLE_ACTIVE_ERROR
        );

        return;
    });

    it(`DELETE ${E2E_ROLE_ADMIN_DELETE_URL} Delete Not Found`, async () => {
        const response = await request(app.getHttpServer())
            .delete(
                E2E_ROLE_ADMIN_DELETE_URL.replace(
                    ':_id',
                    `${new Types.ObjectId()}`
                )
            )
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.NOT_FOUND);
        expect(response.body.statusCode).toEqual(
            ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR
        );

        return;
    });

    it(`DELETE ${E2E_ROLE_ADMIN_DELETE_URL} Delete Success`, async () => {
        const response = await request(app.getHttpServer())
            .delete(E2E_ROLE_ADMIN_DELETE_URL.replace(':_id', role._id))
            .set('Authorization', `Bearer ${accessToken}`)
            .set('user-agent', faker.internet.userAgent())
            .set('x-timestamp', timestamp.toString())
            .set('x-api-key', xApiKey);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.statusCode).toEqual(HttpStatus.OK);

        return;
    });

    afterAll(async () => {
        try {
            await roleBulkService.deleteMany({
                name: 'testRole',
            });
            await roleBulkService.deleteMany({
                name: 'testRole1',
            });
            await roleBulkService.deleteMany({
                name: 'testRole2',
            });
            await roleBulkService.deleteMany({
                name: 'testRole3',
            });
        } catch (e) {}

        connection.close();
        await app.close();
    });
});
