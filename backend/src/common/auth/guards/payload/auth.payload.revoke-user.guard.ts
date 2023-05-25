import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { UserService } from '~/modules/user/services/user.service';
import { ENUM_AUTH_STATUS_CODE_ERROR } from '../../constants/auth.status-code.constant';
import { IUserDocument } from '~/modules/user/user.interface';

@Injectable()
export class AuthPayloadRevokeUser implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { user } = context.switchToHttp().getRequest();

        const u = await this.userService.findOneById<IUserDocument>(user._id, {
            populate: { role: true },
        });

        if (!u.isActive) {
            throw new ForbiddenException({
                statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_INACTIVE_ERROR,
                message: 'auth.error.revokeUser',
            });
        } else if (!u.role.isActive) {
            throw new ForbiddenException({
                statusCode:
                    ENUM_AUTH_STATUS_CODE_ERROR.AUTH_ROLE_INACTIVE_ERROR,
                message: 'auth.error.roleBlocked',
            });
        }

        return true;
    }
}
