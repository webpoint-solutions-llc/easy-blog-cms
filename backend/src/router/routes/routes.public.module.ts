import { Module } from '@nestjs/common';
import { AuthModule } from '~/common/auth/auth.module';
import { RoleModule } from '~/modules/role/role.module';
import { UserModule } from '~/modules/user/user.module';
import { MediaModule } from '~/modules/media/media.module';
import { PermissionModule } from '~/modules/permission/permission.module';
import { UserPublicController } from '~/modules/user/controllers/user.public.controller';
import { SubscribeNewsletterModule } from '~/modules/blogs/subscribe-newsletter/subscribe-newsletter.module';

@Module({
    controllers: [UserPublicController],
    providers: [],
    exports: [],
    imports: [
        UserModule,
        AuthModule,
        RoleModule,
        PermissionModule,
        MediaModule,
        SubscribeNewsletterModule,
    ],
})
export class RoutesPublicModule {}
