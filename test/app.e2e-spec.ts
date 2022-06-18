import { fakeUser, fakeId } from './../src/users/mocks/data/fakeData';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose, { connection } from 'mongoose';

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
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(fakeUser)
      .expect(201)
      .then(({ body }) => {
        expect({ name: body.name, email: body.email, age: body.age }).toEqual({
          ...fakeUser,
        });
      });
  });

  it('/users (GET)', async () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('/users/:id (GET)', async () => {
    const { body } = await request(app.getHttpServer()).get('/users');

    const user = body.find((user) => user.email === fakeUser.email);

    return request(app.getHttpServer()).get(`/users/${user._id}`).expect(200);
  });

  it('/users/:id (PATCH)', async () => {
    const { body } = await request(app.getHttpServer()).get('/users');

    const user = body.find((user) => user.email === fakeUser.email);

    return request(app.getHttpServer())
      .patch(`/users/${user._id}`)
      .send(fakeUser)
      .expect(200);
  });

  it('/users/:id (DELETE)', async () => {
    const { body } = await request(app.getHttpServer()).get('/users');

    const user = body.find((user) => user.email === fakeUser.email);

    return request(app.getHttpServer())
      .delete(`/users/${user._id}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
    await mongoose.disconnect();
  });
});
