import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthService } from '~/common/auth/services/auth.service';
import { UserService } from '~/modules/user/services/user.service';
import { UserBulkService } from '~/modules/user/services/user.bulk.service';
import { RoleService } from '~/modules/role/services/role.service';
import { RoleDocument } from '~/modules/role/schemas/role.schema';

@Injectable()
export class UserSeed {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly userBulkService: UserBulkService,
        private readonly roleService: RoleService
    ) {}

    @Command({
        command: 'insert:user',
        describe: 'insert users',
    })
    async insert(): Promise<void> {
        const superadminRole: RoleDocument =
            await this.roleService.findOne<RoleDocument>({
                name: 'superadmin',
            });
        const adminRole: RoleDocument =
            await this.roleService.findOne<RoleDocument>({
                name: 'admin',
            });
        const companyRole: RoleDocument =
            await this.roleService.findOne<RoleDocument>({
                name: 'company',
            });

        try {
            const superadminPassword = await this.authService.createPassword(
                'Password123*'
            );
            const password = await this.authService.createPassword(
                'Password123*'
            );

            await this.userService.create({
                fullName: 'superadmin',
                // lastName: 'test',
                email: 'superadmin@mail.com',
                password: superadminPassword.passwordHash,
                passwordExpired: superadminPassword.passwordExpired,
                mobileNumber: '08111111222',
                role: superadminRole._id,
                salt: password.salt,
            });

            await this.userService.create({
                fullName: 'admin',
                // lastName: 'test',
                email: 'adminadmin@mail.com',
                password: password.passwordHash,
                passwordExpired: password.passwordExpired,
                mobileNumber: '08111111111',
                role: superadminRole._id,
                salt: password.salt,
            });

            await this.userService.create({
                fullName: 'webpoint',
                // lastName: 'test',
                email: 'marketing@webpoint.io',
                password: password.passwordHash,
                passwordExpired: password.passwordExpired,
                mobileNumber: '08111111333',
                role: companyRole._id,
                salt: password.salt,
            });
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({
        command: 'remove:user',
        describe: 'remove users',
    })
    async remove(): Promise<void> {
        try {
            await this.userBulkService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
