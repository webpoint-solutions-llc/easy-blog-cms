export enum ENUM_AUTH_ACCESS_FOR_SUPER_ADMIN {
    SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum ENUM_AUTH_ACCESS_FOR_DEFAULT {
    USER = 'USER',
    ADMIN = 'ADMIN',
    COMPANY = 'COMPANY',
    CANDIDATE = 'CANDIDATE',
    AUTHOR = 'AUTHOR',
}
export enum ENUM_PORTAL {
    WEB_PORTAL = 'WEB_PORTAL',
    ADMIN_PORTAL = 'ADMIN_PORTAL',
}

export const ENUM_AUTH_ACCESS_FOR = {
    ...ENUM_AUTH_ACCESS_FOR_SUPER_ADMIN,
    ...ENUM_AUTH_ACCESS_FOR_DEFAULT,
};

export type ENUM_AUTH_ACCESS_FOR =
    | ENUM_AUTH_ACCESS_FOR_SUPER_ADMIN
    | ENUM_AUTH_ACCESS_FOR_DEFAULT;
