import { Test, TestingModule } from '@nestjs/testing';
import { SeoTemplateService } from './seo-template.service';

describe('SeoTemplateService', () => {
  let service: SeoTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeoTemplateService],
    }).compile();

    service = module.get<SeoTemplateService>(SeoTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
