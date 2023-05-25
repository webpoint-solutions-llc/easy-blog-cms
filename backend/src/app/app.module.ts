import { Module } from '@nestjs/common';
import { JobsModule } from '~/jobs/jobs.module';
import { AppController } from './controllers/app.controller';
import { RouterModule } from '~/router/router.module';
import { CommonModule } from '~/common/common.module';

@Module({
    controllers: [AppController],
    providers: [],
    imports: [
        CommonModule,

        // Jobs
        JobsModule.register(),

        // Routes
        RouterModule.register(),
    ],
})
export class AppModule {}
