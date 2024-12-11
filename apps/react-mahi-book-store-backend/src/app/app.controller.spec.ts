import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getHealthStatus', () => {
    it('should return "OK" Status and current timestamp', () => {
      const appController = app.get<AppController>(AppController);
      const res = appController.getData();
      expect(appController.getData()).toEqual({
        status: 'OK',
        timestamp: expect.any(Date),
      });
      // Optionally check if timestamp is a valid date
      const timestamp = new Date(res.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).toBeGreaterThan(Date.now() - 1000); // Check if within the last second
    });
  });
});
