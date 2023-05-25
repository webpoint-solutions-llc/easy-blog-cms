import { Module } from '@nestjs/common';
import { AuthModule } from '~/common/auth/auth.module';
import { AuthEnumController } from '~/common/auth/controllers/auth.enum.controller';
import { MessageEnumController } from '~/common/message/controllers/message.enum.controller';

@Module({
    controllers: [AuthEnumController, MessageEnumController],
    providers: [],
    exports: [],
    imports: [AuthModule],
})
export class RoutesEnumModule {}
