import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { HelperDateService } from '~/common/helper/services/helper.date.service';
import { ENUM_AUTH_STATUS_CODE_ERROR } from '../../constants/auth.status-code.constant';

@Injectable()
export class AuthPayloadPasswordExpiredGuard implements CanActivate {
    constructor(private readonly helperDateService: HelperDateService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { user } = context.switchToHttp().getRequest();
        const { passwordExpired } = user;
        const today: Date = this.helperDateService.create();
        const passwordExpiredDate = this.helperDateService.create({
            date: passwordExpired,
        });

        //FUTURE: password reset disable for now
        // if (today > passwordExpiredDate) {
        //     throw new ForbiddenException({
        //         statusCode:
        //             ENUM_AUTH_STATUS_CODE_ERROR.AUTH_PASSWORD_EXPIRED_ERROR,
        //         message: 'auth.error.passwordExpired',
        //     });
        // }

        return true;
    }
}
