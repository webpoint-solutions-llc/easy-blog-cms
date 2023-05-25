import { registerAs } from '@nestjs/config';

export default registerAs(
    'userProfile',
    (): Record<string, any> => ({
        uploadPath: '/userProfile',
    })
);
