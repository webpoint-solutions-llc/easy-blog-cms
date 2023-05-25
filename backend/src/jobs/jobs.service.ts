import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import fs from 'fs';
@Injectable()
export class JobsService {
    private readonly logger = new Logger(JobsService.name);

    @Cron('0 1 * * *')
    handleCron() {
        // clean temp file
        if (fs.existsSync('temp')) fs.rmSync('temp', { recursive: true });

        this.logger.debug('Temp folder cleand');
    }
}
