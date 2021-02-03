import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { assert } from 'console';

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

  it('/books (GET)', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200);
  });

  it('/book (GET): endpoint that does not exist', () => {
    return request(app.getHttpServer())
      .get('/endpoint-that-does-not-exist')
      .expect(404);
  });

  it('/books (POST)', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({id: 8, title: 'Book Title'})
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        assert(response.body.includes({
          "id": 8,
          "title": "test1"
        }));
      });
  });

  it('/books (POST): existing id', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({id: 1, title: 'Book Title'})
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/books (POST): no id', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({title: 'Book Title'})
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/books (POST): endpoint that does not exist', () => {
    return request(app.getHttpServer())
      .post('/endpoint-that-does-not-exist')
      .send({id: 10, title: 'Book Title'})
      .expect('Content-Type', /json/)
      .expect(404);
  });

});
