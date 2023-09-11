import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DeleteResult } from 'mongodb';
import {
    PermissionDocument,
    PermissionEntity,
} from '../schemas/permission.schema';
import { IAuthPermission } from '~/common/auth/auth.interface';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';

@Injectable()
export class PermissionBulkService {
    constructor(
        @DatabaseEntity(PermissionEntity.name)
        private readonly permissionModel: Model<PermissionDocument>
    ) {}

    async createMany(data: IAuthPermission[]): Promise<PermissionDocument[]> {
        return this.permissionModel.insertMany(
            data.map(({ isActive, code, description, name }) => ({
                code: code,
                name: name,
                description: description,
                isActive: isActive || true,
            }))
        );
    }

    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        return this.permissionModel.deleteMany(find);
    }
}
