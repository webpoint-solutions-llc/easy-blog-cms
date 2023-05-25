import { Command } from 'nestjs-command';
import {
    ENUM_AUTH_ACCESS_FOR,
    ENUM_PORTAL,
} from '~/common/auth/constants/auth.enum.constant';
import { Injectable } from '@nestjs/common';
import { RoleService } from '~/modules/role/services/role.service';
import { RoleBulkService } from '~/modules/role/services/role.bulk.service';
import { PermissionService } from '~/modules/permission/services/permission.service';
import { PermissionDocument } from '~/modules/permission/schemas/permission.schema';
import { ENUM_AUTH_PERMISSIONS } from '~/common/auth/constants/auth.enum.permission.constant';

@Injectable()
export class RoleSeed {
    constructor(
        private readonly permissionService: PermissionService,
        private readonly roleBulkService: RoleBulkService,
        private readonly roleService: RoleService
    ) {}

    @Command({
        command: 'insert:role',
        describe: 'insert roles',
    })
    async insert(): Promise<void> {
        const permissions: PermissionDocument[] =
            await this.permissionService.findAll({
                code: { $in: Object.values(ENUM_AUTH_PERMISSIONS) },
            });

        try {
            const permissionsMap = permissions.map((val) => val._id);
            await this.roleService.createSuperAdmin();
            await this.roleBulkService.createMany([
                {
                    name: 'admin',
                    permissions: permissionsMap,
                    accessFor: ENUM_AUTH_ACCESS_FOR.ADMIN,
                    portal: ENUM_PORTAL.ADMIN_PORTAL,
                },
                {
                    name: 'candidate',
                    permissions: [],
                    accessFor: ENUM_AUTH_ACCESS_FOR.CANDIDATE,
                    portal: undefined,
                },
                {
                    name: 'company',
                    permissions: [],
                    accessFor: ENUM_AUTH_ACCESS_FOR.COMPANY,
                    portal: ENUM_PORTAL.WEB_PORTAL,
                },
                {
                    name: 'author',
                    permissions: [],
                    accessFor: ENUM_AUTH_ACCESS_FOR.AUTHOR,
                    portal: ENUM_PORTAL.ADMIN_PORTAL,
                },
            ]);
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({
        command: 'remove:role',
        describe: 'remove roles',
    })
    async remove(): Promise<void> {
        try {
            await this.roleBulkService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
