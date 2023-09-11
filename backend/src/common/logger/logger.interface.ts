import { ENUM_AUTH_ACCESS_FOR } from '../auth/constants/auth.enum.constant';
import { ENUM_REQUEST_METHOD } from '../request/constants/request.enum.constant';
import {
    ENUM_LOGGER_ACTION,
    ENUM_LOGGER_LEVEL,
} from './constants/logger.enum.constant';

export interface ILogger {
    action: ENUM_LOGGER_ACTION;
    description: string;
    apiKey?: string;
    user?: string;
    requestId?: string;
    method: ENUM_REQUEST_METHOD;
    path: string;
    role?: {
        _id: string;
        accessFor: ENUM_AUTH_ACCESS_FOR;
    };
    tags?: string[];
    params?: Record<string, any>;
    bodies?: Record<string, any>;
    statusCode?: number;
}

export interface ILoggerRaw extends ILogger {
    level: ENUM_LOGGER_LEVEL;
}

export interface ILoggerOptions {
    description?: string;
    tags?: string[];
    level?: ENUM_LOGGER_LEVEL;
}
