import { registerAs } from '@nestjs/config';

export default registerAs(
    'ticket',
    (): Record<string, any> => ({
        uploadPath: '/ticket',
    })
);
