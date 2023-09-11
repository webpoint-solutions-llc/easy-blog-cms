import { Module } from '@nestjs/common';
import { AwsModule } from '~/common/aws/aws.module';
import { AwsHealthIndicator } from './indicators/health.aws.indicator';

@Module({
    providers: [AwsHealthIndicator],
    exports: [AwsHealthIndicator],
    imports: [AwsModule],
})
export class HealthModule {}
