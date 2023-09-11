import { applyDecorators, UseGuards } from '@nestjs/common';
import { SettingNotFoundGuard } from '../guards/setting.not-found.guard';
import {
    SettingPutToRequestByNameGuard,
    SettingPutToRequestGuard,
} from '../guards/setting.put-to-request.guard';

export function SettingGetGuard(): any {
    return applyDecorators(
        UseGuards(SettingPutToRequestGuard, SettingNotFoundGuard)
    );
}

export function SettingGetByNameGuard(): any {
    return applyDecorators(
        UseGuards(SettingPutToRequestByNameGuard, SettingNotFoundGuard)
    );
}
