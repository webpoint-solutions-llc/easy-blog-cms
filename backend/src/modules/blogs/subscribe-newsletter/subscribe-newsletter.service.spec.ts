import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeNewsletterService } from './subscribe-newsletter.service';

describe('SubscribeNewsletterService', () => {
  let service: SubscribeNewsletterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribeNewsletterService],
    }).compile();

    service = module.get<SubscribeNewsletterService>(SubscribeNewsletterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
