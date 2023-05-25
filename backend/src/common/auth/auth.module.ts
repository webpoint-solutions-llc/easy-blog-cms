import {
    AuthApiDatabaseName,
    AuthApiEntity,
    AuthApiSchema,
} from './schemas/auth.api.schema';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { HelperModule } from '../helper/helper.module';
import { RoleModule } from '~/modules/role/role.module';
import { UserModule } from '~/modules/user/user.module';
import { GoogleService } from './services/google.service';
import { JwtStrategy } from './guards/jwt/auth.jwt.strategy';
import { AuthApiService } from './services/auth.api.service';
import { AuthEnumService } from './services/auth.enum.service';
import { ApiKeyGuard } from './guards/api-key/auth.api-key.guard';
import { AuthApiBulkService } from './services/auth.api.bulk.service';
import { ApiKeyStrategy } from './guards/api-key/auth.api-key.strategy';
import { SocialSignUpController } from './controllers/auth.social.controller';
import { DATABASE_CONNECTION_NAME } from '../database/constants/database.constant';
import { JwtRefreshStrategy } from './guards/jwt-refresh/auth.jwt-refresh.strategy';

@Module({
    providers: [
        AuthService,
        AuthApiService,
        AuthApiBulkService,
        AuthEnumService,
        JwtStrategy,
        JwtRefreshStrategy,
        ApiKeyStrategy,
        GoogleService,
        {
            provide: APP_GUARD,
            useClass: ApiKeyGuard,
        },
    ],
    exports: [AuthService, AuthApiService, AuthApiBulkService, AuthEnumService],
    controllers: [SocialSignUpController],
    imports: [
        HelperModule,
        // UserModule,
        forwardRef(() => UserModule),
        RoleModule,
        MongooseModule.forFeature(
            [
                {
                    name: AuthApiEntity.name,
                    schema: AuthApiSchema,
                    collection: AuthApiDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class AuthModule {}
