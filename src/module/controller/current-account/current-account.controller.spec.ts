import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { CurrentAccountController } from './current-account.controller';

describe('currentAccount', () => {
  let app: INestApplication;
  let controller: CurrentAccountController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [CurrentAccountController],
    }).compile();

    app = moduleFixture.createNestApplication();
    controller = moduleFixture.get<CurrentAccountController>(CurrentAccountController);
    await app.init();
  });

  describe('unit test CurrentAccount', () => {
    it('/current-account (POST)', async () => {});

    it('/current-account/basic-info/:accountId (GET)', async () => {});
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

    it('/current-account/basic-info/:accountId (GET)', () => {
      return request(app.getHttpServer()).get('/current-account/basic-info/23').expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
