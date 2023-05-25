import { Test, TestingModule } from '@nestjs/testing';
import { SeoSettingService } from './seo-setting.service';

describe('SeoSettingService', () => {
  let service: SeoSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeoSettingService],
    }).compile();

    service = module.get<SeoSettingService>(SeoSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
