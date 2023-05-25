import { Request } from 'express';
import { IResult } from 'ua-parser-js';
import { IAuthApiPayload } from '../auth/auth.interface';

export interface IRequestApp extends Request {
    id?: string;
    timezone: string;
    timestamp: number;
    customLang: string[];
    apiKey?: IAuthApiPayload;
    version: string;
    repoVersion: string;
    userAgent?: IResult;

    user?: Record<string, any>;
    __class: string;
    __function: string;
}
