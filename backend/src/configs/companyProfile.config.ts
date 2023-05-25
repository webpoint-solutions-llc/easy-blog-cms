import { registerAs } from '@nestjs/config';

export default registerAs(
    'companyProfile',
    (): Record<string, any> => ({
        uploadPath: '/companyProfile',
    })
);
