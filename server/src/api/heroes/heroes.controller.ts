import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Hero } from '../../../../shared/hero';
import { HeroesService } from './heroes.service';

@Controller()
@UseGuards(AuthGuard())
export class HeroesController {

  constructor(private readonly heroesService: HeroesService) { }

  @Post()
  create(@Body() hero: Hero): Hero {
    return this.heroesService.create(hero);
  }

  @Get()
  findAll(@Query('name') term: string): Hero[] {
    if (term) {
      return this.heroesService.findByName(term);
    } else {
      return this.heroesService.findAll();
    }
  }

  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number): Hero {
    return this.heroesService.findById(id);
  }

  @Put(':id')
  updateById(@Param('id', new ParseIntPipe()) id: number, @Body() hero: Hero): Hero {
    hero.id = id;
    return this.heroesService.update(hero);
  }

  @Put()
  update(@Body() hero: Hero): Hero {
    return this.heroesService.update(hero);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    this.heroesService.remove({id});
  }

}
