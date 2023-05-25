import {
    Body,
    Controller,
    InternalServerErrorException,
    Put,
} from '@nestjs/common';
import { ENUM_AUTH_PERMISSIONS } from '~/common/auth/constants/auth.enum.permission.constant';
import { AuthAdminJwtGuard } from '~/common/auth/decorators/auth.jwt.decorator';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';
import { RequestParamGuard } from '~/common/request/decorators/request.decorator';
import { Response } from '~/common/response/decorators/response.decorator';
import { IResponse } from '~/common/response/response.interface';
import { SettingUpdateGuard } from '../decorators/setting.admin.decorator';
import { GetSetting } from '../decorators/setting.decorator';
import { SettingRequestDto } from '../dtos/setting.request.dto';
import { SettingUpdateDto } from '../dtos/setting.update.dto';
import { SettingDocument } from '../schemas/setting.schema';
import { SettingService } from '../services/setting.service';

@Controller({
    version: '1',
    path: '/setting',
})
export class SettingAdminController {
    constructor(private readonly settingService: SettingService) {}

    @Response('setting.update')
    @SettingUpdateGuard()
    @RequestParamGuard(SettingRequestDto)
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.SETTING_READ,
        ENUM_AUTH_PERMISSIONS.SETTING_UPDATE
    )
    @Put('/update/:setting')
    async update(
        @GetSetting() setting: SettingDocument,
        @Body()
        body: SettingUpdateDto
    ): Promise<IResponse> {
        try {
            await this.settingService.updateOneById(setting._id, body);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return {
            _id: setting._id,
        };
    }
}
