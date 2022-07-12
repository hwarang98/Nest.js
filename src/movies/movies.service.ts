import { Injectable, NotFoundException } from '@nestjs/common';
import { throws } from 'assert';
import { Movie } from './entities/movies.entities';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`영화의 ID:${id}가 없습니다.`);
    }
    return movie;
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    return `ID:${id} 의 영화가 삭제 되었습니다.`;
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: string, patchData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...patchData });
    return `ID: ${id}의 영화의 title: ${patchData.title}를 변경 하였습니다.`;
  }
}
