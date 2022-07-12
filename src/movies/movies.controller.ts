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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return '모든 영화를 보여줌';
  }

  // nest.js에서 search 부분이 get보다 밑에있으면 search 를 id로 판단하니 위로 올려야됨
  @Get('/search')
  search(@Query('year') searchingYear: string) {
    return `영화 제목을 ${searchingYear}년대 이후로 찾는중...`;
  }

  // id가 제일 위에있으면 다른 get들이 작동하지않는다.
  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `하나의 영화만 보여줌 영화의 아이디는  ${movieId} 임`;
  }

  @Post()
  create(@Body() movieData): string {
    return movieData;
  }

  @Delete('/:id')
  delete(@Param('id') movieDeleteId: string) {
    return `${movieDeleteId}번 영화 삭제`;
  }

  @Patch('/:id')
  patchMovies(@Param('id') moviePatchId: string, @Body() patchData) {
    return {
      patchMovies: moviePatchId,
      ...patchData,
    };
  }

  @Put('/:id')
  putMovies(@Param('id') moviePutId: string) {
    return `${moviePutId}번 영화 put`;
  }
}
