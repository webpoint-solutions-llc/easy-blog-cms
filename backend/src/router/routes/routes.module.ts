import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { AwsModule } from '~/common/aws/aws.module';
import { HealthModule } from '~/health/health.module';
import { AuthModule } from '~/common/auth/auth.module';
import { RoleModule } from '~/modules/role/role.module';
import { UserModule } from '~/modules/user/user.module';
import { TagModule } from '~/modules/blogs/tag/tag.module';
import { BlogModule } from '~/modules/blogs/blog/blog.module';
import { CommentModule } from '~/modules/blogs/comment/comment.module';
import { HealthController } from '~/health/controllers/health.controller';
import { PermissionModule } from '~/modules/permission/permission.module';
import { UserController } from '~/modules/user/controllers/user.controller';
import { SeoSettingModule } from '~/modules/blogs/seo-setting/seo-setting.module';
import { SettingController } from '~/common/setting/controllers/setting.controller';
import { SeoTemplateModule } from '~/modules/blogs/seo-template/seo-template.module';
import { BlogCategoryModule } from '~/modules/blogs/blog-category/blog-category.module';

@Module({
    controllers: [SettingController, UserController, HealthController],
    providers: [],
    exports: [],
    imports: [
        UserModule,
        AuthModule,
        AwsModule,
        PermissionModule,
        RoleModule,
        HealthModule,
        TerminusModule,
        HttpModule,
        BlogCategoryModule,
        BlogModule,
        CommentModule,
        TagModule,
        SeoSettingModule,
        SeoTemplateModule,
    ],
})
export class RoutesModule {}
