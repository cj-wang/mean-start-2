import { Injectable, NotFoundException } from '@nestjs/common';

import { Hero } from '../../../../shared/hero';
import { HEROES } from '../../../../shared/mock-heroes';

@Injectable()
export class HeroesService {
  private readonly heroes: Hero[] = HEROES;

  create(hero: Hero): Hero {
    hero.id = this.genId();
    this.heroes.push(hero);
    return hero;
  }

  findAll(): Hero[] {
    return this.heroes;
  }

  findByName(term: string): Hero[] {
    return this.heroes.filter((h: Hero) => h.name.search(new RegExp(term, 'i')) >= 0);
  }

  findById(id: number): Hero {
    const hero = this.heroes.filter((h: Hero) => h.id === id)[0];
    if (hero) {
      return hero;
    } else {
      throw new NotFoundException();
    }
  }

  update(hero: Hero): Hero {
    const existingHero = this.findById(hero.id);
    const index = this.heroes.indexOf(existingHero);
    this.heroes[index] = hero;
    return hero;
  }

  remove(hero: Hero) {
    const existingHero = this.findById(hero.id);
    const index = this.heroes.indexOf(existingHero);
    this.heroes.splice(index, 1);
  }

  // The genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  private genId(): number {
    return this.heroes.length > 0 ? Math.max(...this.heroes.map(hero => hero.id)) + 1 : 11;
  }

}
