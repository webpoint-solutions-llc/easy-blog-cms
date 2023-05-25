export const USER_ACTIVE_META_KEY = 'UserActiveMetaKey';

export enum LoginAs {
    COMPANY = 'company',
    CANDIDATE = 'candidate',
}

export enum ENUM_ROLES {
    CANDIDATE = 'candidate',
    COMPANY = 'company',
    ADMIN = 'admin',
    AUTHOR = 'author',
}

export const ALLOW_ADMIN_PORTAL_ROLES = ['superadmin', 'admin', 'author'];
export const ALLOW_WEB_PORTAL_ROLES = ['company'];

export const lastLogin = {
    'Any time': 'Any time',
    'Last 20min ago': 'Last 20min ago',
    'Last 1 hour ago': 'Last 1 hour ago',
    'Last 24 hour ago': 'Last 24 hour ago',
};
