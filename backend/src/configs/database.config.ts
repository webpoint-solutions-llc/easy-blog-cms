import { registerAs } from '@nestjs/config';

export default registerAs(
    'database',
    (): Record<string, any> => ({
        host: process.env.DATABASE_HOST || 'mongodb://127.0.0.1:27017',
        name: process.env.DATABASE_NAME || 'blogcms',
        user: process.env.DATABASE_USER || null,
        password: process.env.DATABASE_PASSWORD || null,
        debug: process.env.DATABASE_DEBUG === 'true' || false,
        options: process.env.DATABASE_OPTIONS,
    })
);
