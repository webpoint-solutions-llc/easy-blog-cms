import { Module } from '@nestjs/common';
import { RoleSeed } from './seeds/role.seed';
import { UserSeed } from './seeds/user.seed';
import { CommandModule } from 'nestjs-command';
import { SettingSeed } from './seeds/setting.seed';
import { AuthApiSeed } from './seeds/auth.api.seed';
import { CommonModule } from '~/common/common.module';
import { AuthModule } from '~/common/auth/auth.module';
import { RoleModule } from '~/modules/role/role.module';
import { UserModule } from '~/modules/user/user.module';
import { PermissionSeed } from './seeds/permission.seed';
import { AreaOfInterestSeed } from './seeds/area_of_interest.seed';
import { PermissionModule } from '~/modules/permission/permission.module';

@Module({
    imports: [
        CommonModule,
        CommandModule,
        AuthModule,
        PermissionModule,
        RoleModule,
        UserModule,
    ],
    providers: [
        AuthApiSeed,
        PermissionSeed,
        RoleSeed,
        UserSeed,
        SettingSeed,
        AreaOfInterestSeed,
    ],
    exports: [],
})
export class MigrationModule {}
