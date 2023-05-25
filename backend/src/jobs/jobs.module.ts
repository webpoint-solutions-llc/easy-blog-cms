import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { JobsService } from './jobs.service';

@Module({})
export class JobsModule {
    static register(): DynamicModule {
        if (process.env.APP_JOB_ON === 'true') {
            return {
                module: JobsModule,
                controllers: [],
                providers: [JobsService],
                exports: [],
                imports: [ScheduleModule.forRoot()],
            };
        }

        return {
            module: JobsModule,
            providers: [],
            exports: [],
            controllers: [],
            imports: [],
        };
    }
}
