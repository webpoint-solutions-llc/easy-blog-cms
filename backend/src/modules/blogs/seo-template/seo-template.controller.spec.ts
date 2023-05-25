import { Test, TestingModule } from '@nestjs/testing';
import { SeoTemplateController } from './seo-template.controller';
import { SeoTemplateService } from './seo-template.service';

describe('SeoTemplateController', () => {
  let controller: SeoTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeoTemplateController],
      providers: [SeoTemplateService],
    }).compile();

    controller = module.get<SeoTemplateController>(SeoTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
