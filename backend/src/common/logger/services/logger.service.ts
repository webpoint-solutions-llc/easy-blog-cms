import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ILogger, ILoggerRaw } from '../logger.interface';
import { LoggerDocument, LoggerEntity } from '../schemas/logger.schema';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { ENUM_LOGGER_LEVEL } from '../constants/logger.enum.constant';

@Injectable()
export class LoggerService {
    constructor(
        @DatabaseEntity(LoggerEntity.name)
        private readonly loggerModel: Model<LoggerDocument>
    ) {}

    async info({
        action,
        description,
        apiKey,
        user,
        method,
        requestId,
        role,
        params,
        bodies,
        path,
        statusCode,
        tags,
    }: ILogger): Promise<LoggerDocument> {
        const create = new this.loggerModel({
            level: ENUM_LOGGER_LEVEL.INFO,
            user: user ? new Types.ObjectId(user) : undefined,
            apiKey: apiKey ? new Types.ObjectId(apiKey) : undefined,
            anonymous: user ? false : true,
            action,
            description,
            method,
            requestId,
            role: role ? new Types.ObjectId(role._id) : undefined,
            accessFor: role && role.accessFor ? role.accessFor : undefined,
            params,
            bodies,
            path,
            statusCode,
            tags,
        });
        return create.save();
    }

    async debug({
        action,
        description,
        apiKey,
        user,
        method,
        requestId,
        role,
        params,
        bodies,
        path,
        statusCode,
        tags,
    }: ILogger): Promise<LoggerDocument> {
        const create = new this.loggerModel({
            level: ENUM_LOGGER_LEVEL.DEBUG,
            user: user ? new Types.ObjectId(user) : undefined,
            apiKey: apiKey ? new Types.ObjectId(apiKey) : undefined,
            anonymous: user ? false : true,
            action,
            description,
            method,
            requestId,
            role: role ? new Types.ObjectId(role._id) : undefined,
            accessFor: role && role.accessFor ? role.accessFor : undefined,
            params,
            bodies,
            path,
            statusCode,
            tags,
        });
        return create.save();
    }

    async warning({
        action,
        description,
        apiKey,
        user,
        method,
        requestId,
        role,
        params,
        bodies,
        path,
        statusCode,
        tags,
    }: ILogger): Promise<LoggerDocument> {
        const create = new this.loggerModel({
            level: ENUM_LOGGER_LEVEL.WARM,
            user: user ? new Types.ObjectId(user) : undefined,
            apiKey: apiKey ? new Types.ObjectId(apiKey) : undefined,
            anonymous: user ? false : true,
            action,
            description,
            method,
            requestId,
            role: role ? new Types.ObjectId(role._id) : undefined,
            accessFor: role && role.accessFor ? role.accessFor : undefined,
            params,
            bodies,
            path,
            statusCode,
            tags,
        });
        return create.save();
    }

    async fatal({
        action,
        description,
        apiKey,
        user,
        method,
        requestId,
        role,
        params,
        bodies,
        path,
        statusCode,
        tags,
    }: ILogger): Promise<LoggerDocument> {
        const create = new this.loggerModel({
            level: ENUM_LOGGER_LEVEL.FATAL,
            user: user ? new Types.ObjectId(user) : undefined,
            apiKey: apiKey ? new Types.ObjectId(apiKey) : undefined,
            anonymous: user ? false : true,
            action,
            description,
            method,
            requestId,
            role: role ? new Types.ObjectId(role._id) : undefined,
            accessFor: role && role.accessFor ? role.accessFor : undefined,
            params,
            bodies,
            path,
            statusCode,
            tags,
        });
        return create.save();
    }

    async raw({
        level,
        action,
        description,
        apiKey,
        user,
        method,
        requestId,
        role,
        params,
        bodies,
        path,
        statusCode,
        tags,
    }: ILoggerRaw): Promise<LoggerDocument> {
        const create = new this.loggerModel({
            level,
            user: user ? new Types.ObjectId(user) : undefined,
            apiKey: apiKey ? new Types.ObjectId(apiKey) : undefined,
            anonymous: user ? false : true,
            action,
            description,
            method,
            requestId,
            role: role ? new Types.ObjectId(role._id) : undefined,
            accessFor: role && role.accessFor ? role.accessFor : undefined,
            params,
            bodies,
            path,
            statusCode,
            tags,
        });
        return create.save();
    }
}
