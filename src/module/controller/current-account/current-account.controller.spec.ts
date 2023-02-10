import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('currentAccount', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // unit test

  // e2e
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

  afterAll(async () => {
    await app.close();
  });
});
