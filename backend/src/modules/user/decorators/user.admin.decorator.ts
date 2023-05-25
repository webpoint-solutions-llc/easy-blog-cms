import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { USER_ACTIVE_META_KEY } from '../constants/user.constant';
import { UserActiveGuard } from '../guards/user.active.guard';
import { UserNotFoundGuard } from '../guards/user.not-found.guard';
import { UserPutToRequestGuard } from '../guards/user.put-to-request.guard';

export function UserGetGuard(): any {
    return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export function UserDeleteGuard(): any {
    return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export function UserUpdateGuard(): any {
    return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export function UserUpdateInactiveGuard(): any {
    return applyDecorators(
        UseGuards(UserPutToRequestGuard, UserNotFoundGuard, UserActiveGuard),
        SetMetadata(USER_ACTIVE_META_KEY, [true])
    );
}

export function UserUpdateActiveGuard(): any {
    return applyDecorators(
        UseGuards(UserPutToRequestGuard, UserNotFoundGuard, UserActiveGuard),
        SetMetadata(USER_ACTIVE_META_KEY, [false])
    );
}
