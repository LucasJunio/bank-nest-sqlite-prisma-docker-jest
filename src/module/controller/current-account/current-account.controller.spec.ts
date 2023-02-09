import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../../app.service';
import { CurrentAccountController } from './current-account.controller';

describe('CurrentAccountController', () => {
  let currentAccountController: CurrentAccountController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CurrentAccountController],
      providers: [AppService],
    }).compile();

    currentAccountController = app.get<CurrentAccountController>(CurrentAccountController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        currentAccountController.create({
          custumerId: 1,
          initialCredit: 15.55,
        }),
      ).toBe('Hello World!');
    });
  });
});
