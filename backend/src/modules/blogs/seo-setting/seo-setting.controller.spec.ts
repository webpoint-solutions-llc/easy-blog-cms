import { Test, TestingModule } from '@nestjs/testing';
import { SeoSettingController } from './seo-setting.controller';
import { SeoSettingService } from './seo-setting.service';

describe('SeoSettingController', () => {
  let controller: SeoSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeoSettingController],
      providers: [SeoSettingService],
    }).compile();

    controller = module.get<SeoSettingController>(SeoSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
