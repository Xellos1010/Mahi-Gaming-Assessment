import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getHealthStatus', () => {
    it('should return "OK" status and timestamp', () => {
      expect(service.getHealthStatus()).toEqual({
        status: 'OK',
        timestamp: expect.any(Date),
      });
    });
  });
});
