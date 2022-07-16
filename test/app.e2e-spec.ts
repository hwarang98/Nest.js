import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // test 환경에선 trasform이 작동하지 않아서 넣었지만 지금은되는듯?
    // 하지만 테스트 환경은 실제 구동 되는 앱이랑 똑같은 환경을 만들어 줘야하므로 되든안되는 넣자
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('나의 영화 API에 온걸 환영한다.');
  });

  describe('/movies url 테스트', () => {
    it('GET 요청 성공', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
    it('POST 요청 성공', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400 실패 테스트', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2000,
          genres: ['test'],
          test: 'test',
        })
        .expect(400);
    });
    it('DELETE 요청 성공', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id 테스트', () => {
    it('GET 200 테스트', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('PATCH 201 테스트', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });
    it('DELETE 200 테스트', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
  });
});
