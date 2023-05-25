import { Module } from '@nestjs/common';
import { AuthModule } from '~/common/auth/auth.module';
import { RoleModule } from '~/modules/role/role.module';
import { UserModule } from '~/modules/user/user.module';
import { BlogModule } from '~/modules/blogs/blog/blog.module';
import { PermissionModule } from '~/modules/permission/permission.module';
import { RoleAdminController } from '~/modules/role/controllers/role.admin.controller';
import { UserAdminController } from '~/modules/user/controllers/user.admin.controller';
import { SettingAdminController } from '~/common/setting/controllers/setting.admin.controller';
import { PermissionAdminController } from '~/modules/permission/controllers/permission.admin.controller';
@Module({
    controllers: [
        SettingAdminController,
        UserAdminController,
        RoleAdminController,
        PermissionAdminController,
    ],
    providers: [],
    exports: [],
    imports: [UserModule, AuthModule, RoleModule, PermissionModule, BlogModule],
})
export class RoutesAdminModule {}
