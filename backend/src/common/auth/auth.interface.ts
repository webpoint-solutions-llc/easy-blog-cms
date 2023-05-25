import { Types } from 'mongoose';

// Auth API
export interface IAuthApiPayload {
    _id: string;
    key: string;
    name: string;
}

export interface IAuthApi {
    _id: Types.ObjectId;
    secret: string;
    passphrase: string;
    encryptionKey: string;
}

export interface IAuthApiRequestHashedData {
    key: string;
    timestamp: number;
    hash: string;
}

// Auth
export interface IAuthPassword {
    salt: string;
    passwordHash: string;
    passwordExpired: Date;
}

export interface IAuthPayloadOptions {
    loginDate: Date;
}

export interface IAuthPermission {
    code: string;
    name: string;
    description?: string;
    isActive?: boolean;
}

export interface GoogleJwtPayload {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number;
    exp: number;
}
