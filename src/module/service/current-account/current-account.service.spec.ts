import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { currentAccountInput } from 'src/module/input/current-account/current-account.input';
import { CurrentAccountRepository } from 'src/module/repository/current-account/current-account.repository';
import { CurrentAccountService } from 'src/module/service/current-account/current-account.service';
import * as request from 'supertest';
import { CurrentAccountController } from '../../controller/current-account/current-account.controller';
import { TransactionService } from '../transaction/transaction.service';

describe('currentAccount', () => {
  let app: INestApplication;
  let controller: CurrentAccountController;
  let currentAccountService: CurrentAccountService;
  let currentAccountRepository: CurrentAccountRepository;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        CurrentAccountController,
        {
          provide: TransactionService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              currentAccountId: 1,
              createdAt: '2023-02-13T12:48:05.267Z',
              value: 2,
              type: 'CREDIT',
            }),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    controller = moduleFixture.get<CurrentAccountController>(CurrentAccountController);
    currentAccountService = moduleFixture.get<CurrentAccountService>(CurrentAccountService);
    transactionService = moduleFixture.get<TransactionService>(TransactionService);
    currentAccountRepository = moduleFixture.get<CurrentAccountRepository>(CurrentAccountRepository);
    await app.init();
  });

  describe('unit test current account service', () => {
    it('should be defined', () => {
      expect(currentAccountService).toBeDefined();
    });

    describe('/current-account (POST) create method', () => {
      it('create method should create a current account and return the all informed like currentAccountSchema', async () => {
        jest.spyOn(currentAccountService as any, 'checkInitialCredit');
        jest.spyOn(currentAccountService as any, 'registerTransaction');
        jest.spyOn(currentAccountRepository, 'create').mockResolvedValue({
          id: 1,
          total: 0,
          createdAt: new Date('2023-02-13T12:47:05.267Z'),
          custumerId: 1,
        });

        const promise = await currentAccountService.create({
          custumerId: 1,
          initialCredit: 2,
        } as currentAccountInput);

        expect((currentAccountService as any).checkInitialCredit).toHaveBeenCalledWith({
          custumerId: 1,
          initialCredit: 2,
        });
        expect((currentAccountService as any).registerTransaction).toHaveBeenCalledWith(
          {
            custumerId: 1,
            initialCredit: 2,
          },
          1,
        );
        expect(promise).toEqual({
          id: 1,
          total: 2,
          custumerId: 1,
          createdAt: new Date('2023-02-13T12:47:05.267Z'),
        });
      });
    });
  });

  describe('e2e CurrentAccount', () => {
    it('/current-account (POST)', async () => {
      return await request(app.getHttpServer())
        .post('/current-account')
        .set('Accept', 'application/json')
        .send({
          custumerId: 1,
          initialCredit: 25,
        })
        .expect(201);
    });

    it('/current-account (POST) createAccountValidation method should return BadRequestException with string parameter custumerId', async () => {
      return await request(app.getHttpServer())
        .post('/current-account')
        .set('Accept', 'application/json')
        .send({
          custumerId: 'Test',
          initialCredit: 25,
        })
        .expect(400);
    });

    it('/current-account (POST) checkInitialCredit method should throw a BadRequestException error when the user enter with initialCredit less that zero (0)', async () => {
      return await request(app.getHttpServer())
        .post('/current-account')
        .set('Accept', 'application/json')
        .send({
          custumerId: 1,
          initialCredit: -25,
        })
        .expect(400);
    });

    it('/current-account/basic-info/:accountId (GET), if have at least one record for a checking account', () => {
      return request(app.getHttpServer()).get('/current-account/basic-info/1').expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
