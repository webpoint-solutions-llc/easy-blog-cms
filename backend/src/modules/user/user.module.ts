import {
    UserDatabaseName,
    UserEntity,
    UserSchema,
} from './schemas/user.schema';
import {
    PasswordResetTokenDatabaseName,
    PasswordResetTokenEntity,
    PasswordResetTokenSchema,
} from './schemas/password.reset.schema';
import {
    RoleDatabaseName,
    RoleEntity,
    RoleSchema,
} from '../role/schemas/role.schema';
import {
    Blog,
    BlogApiDatabaseName,
    BlogApiSchema,
} from '../blogs/blog/entities/blog.entity';
import { RoleModule } from '../role/role.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsModule } from '~/common/aws/aws.module';
import { UserService } from './services/user.service';
import { AuthModule } from '~/common/auth/auth.module';
import { MailModule } from '~/common/mail/mail.module';
import { GoogleStrategy } from './services/google.strategy';
import { forwardRef, Global, Module } from '@nestjs/common';
import { UserBulkService } from './services/user.bulk.service';
import { LinkedinAuthStrategy } from './services/linkedin.strategy';
import { DATABASE_CONNECTION_NAME } from '~/common/database/constants/database.constant';

@Global()
@Module({
    imports: [
        // AuthModule,
        forwardRef(() => AuthModule),
        RoleModule,
        AwsModule,
        MongooseModule.forFeature(
            [
                {
                    name: UserEntity.name,
                    schema: UserSchema,
                    collection: UserDatabaseName,
                },
                {
                    name: RoleEntity.name,
                    schema: RoleSchema,
                    collection: RoleDatabaseName,
                },
                {
                    name: PasswordResetTokenEntity.name,
                    schema: PasswordResetTokenSchema,
                    collection: PasswordResetTokenDatabaseName,
                },
                {
                    name: Blog.name,
                    schema: BlogApiSchema,
                    collection: BlogApiDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
    exports: [UserService, UserBulkService],
    providers: [
        UserService,
        UserBulkService,
        GoogleStrategy,
        LinkedinAuthStrategy,
    ],
    controllers: [],
})
export class UserModule {}
