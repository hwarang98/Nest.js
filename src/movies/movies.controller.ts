import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movies.entities';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  // nest.js에서 search 부분이 get보다 밑에있으면 search 를 id로 판단하니 위로 올려야됨
  @Get('/search')
  search(@Query('year') searchingYear: string) {
    return `영화 제목을 ${searchingYear}년대 이후로 찾는중...`;
  }

  // id가 제일 위에있으면 다른 get들이 작동하지않는다.
  @Get('/:id')
  getOne(@Param('id') movieId: string): Movie {
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    return this.movieService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieDeleteId: string) {
    return this.movieService.deleteOne(movieDeleteId);
  }

  @Patch('/:id')
  patchMovies(@Param('id') moviePatchId: string, @Body() patchData) {
    return this.movieService.update(moviePatchId, patchData);
  }

  // @Put('/:id')
  // putMovies(@Param('id') moviePutId: string) {
  //   return `${moviePutId}번 영화 put`;
  // }
}
