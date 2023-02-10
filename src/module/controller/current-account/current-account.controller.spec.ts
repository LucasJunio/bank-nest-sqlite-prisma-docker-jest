import { Test, TestingModule } from '@nestjs/testing';
import { CurrentAccountService } from 'src/module/service/current-account/current-account.service';
import { CurrentAccountController } from './current-account.controller';

describe('CurrentAccountController', () => {
  let currentAccountController: CurrentAccountController;
  let currentAccountService: CurrentAccountService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CurrentAccountController],
      providers: [CurrentAccountService],
    }).compile();

    currentAccountService = app.get<CurrentAccountService>(CurrentAccountService);
    currentAccountController = app.get<CurrentAccountController>(CurrentAccountController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const response = await fetch('http://localhost:3000/current-account/basic-info/23');
      const responseBody = await response.json();

      expect(response.status).toBe(200);
    });
  });
});
