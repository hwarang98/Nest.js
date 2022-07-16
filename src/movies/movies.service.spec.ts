import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll 함수 테스트', () => {
    it('배열을 리턴해야합니다.', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getOne 함수 테스트', () => {
    it('영화를 리턴해야합니다.', () => {
      service.create({
        title: '영화 테스트',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('404 에러가 나와야합니다.', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`영화의 ID:999가 없습니다.`);
      }
    });
  });

  describe('deleteOne 함수 테스트', () => {
    it('영화가 삭제 되어야 합니다.', () => {
      service.create({
        title: '영화 테스트',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    });
    it('404 에러가 나와야함.', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  // describe('create 함수 테스트', () => {
  //   const beforeCreate = service.getAll().length;
  //   it('영화가 생성되어야합니다.', () => {
  //     service.create({
  //       title: '영화 테스트',
  //       genres: ['test'],
  //       year: 2000,
  //     });
  //     const afterCreate = service.getAll().length;
  //     expect(afterCreate).toBeGreaterThan(beforeCreate);
  //   });
  // });

  describe('update 함수 테스트', () => {
    it('영화가 update 되어야함', () => {
      service.create({
        title: '영화 테스트',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: '영화 업데이트 테스트' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('영화 업데이트 테스트');
    });
    it('NotFoundException가 나와야함', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
