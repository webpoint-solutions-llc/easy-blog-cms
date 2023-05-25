import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeNewsletterController } from './subscribe-newsletter.controller';
import { SubscribeNewsletterService } from './subscribe-newsletter.service';

describe('SubscribeNewsletterController', () => {
  let controller: SubscribeNewsletterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribeNewsletterController],
      providers: [SubscribeNewsletterService],
    }).compile();

    controller = module.get<SubscribeNewsletterController>(SubscribeNewsletterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
