import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('/ (GET) / signup ', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ name: 'supertest', email: 'supertest@email.com', password: 'supertest' })
      .expect(201)
      .then(res => expect(res.body.name).toBe('supertest'));
  });
});
