import { registerAs } from '@nestjs/config';

export default registerAs(
    'user',
    (): Record<string, any> => ({
        uploadPath: '/media',
        verficationEmailExpireTime: 30,
    })
);
