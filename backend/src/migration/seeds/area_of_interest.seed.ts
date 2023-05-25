import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthApiService } from '~/common/auth/services/auth.api.service';
import { AuthApiBulkService } from '~/common/auth/services/auth.api.bulk.service';

@Injectable()
export class AreaOfInterestSeed {
    constructor(
        private readonly authApiService: AuthApiService,
        private readonly authApiBulkService: AuthApiBulkService
    ) {}

    @Command({
        command: 'insert:area_of_interest',
        describe: 'insert area_of_interest',
    })
    async insert(): Promise<void> {
        try {
            await this.authApiService.createRaw({
                name: 'Auth Api Key Migration',
                description: 'From migration',
                key: 'qwertyuiop12345zxcvbnmkjh',
                secret: '5124512412412asdasdasdasdasdASDASDASD',
                passphrase: 'cuwakimacojulawu',
                encryptionKey: 'opbUwdiS1FBsrDUoPgZdx',
            });
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({
        command: 'remove:area_of_interest',
        describe: 'remove area_of_interest',
    })
    async remove(): Promise<void> {
        try {
            await this.authApiBulkService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
