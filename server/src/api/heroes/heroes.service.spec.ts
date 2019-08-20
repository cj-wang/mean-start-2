import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { HeroesService } from './heroes.service';

import { Hero } from '../../../../shared/hero';

describe('HeroesService', () => {
  let service: HeroesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroesService],
    }).compile();
    service = module.get<HeroesService>(HeroesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let hero: Hero;

  describe('findAll()', () => {
    it('should return all heroes', () => {
      expect(Array.isArray(service.findAll())).toBeTruthy();
    });
  });

  describe('create()', () => {
    it('should create new hero', () => {
      const numberOfHeroes = service.findAll().length;
      hero = service.create({
        name: 'New Hero',
      });
      expect(service.findAll().length).toBe(numberOfHeroes + 1);
    });

    it('should generate id', () => {
      expect(hero.id).toBeTruthy();
    });
  });

  describe('findByName()', () => {
    it('should find the heros by name', () => {
      expect(service.findByName('ew her')).toEqual([hero]);
    });
  });

  describe('findById()', () => {
    it('should find the hero by id', () => {
      expect(service.findById(hero.id)).toEqual(hero);
    });

    it('should throw 404 if not found', () => {
      expect(() => service.findById(99)).toThrow(NotFoundException);
    });
  });

  describe('update()', () => {
    it('should update the hero', () => {
      hero.name = 'Updated Name';
      hero = service.update(hero);
      expect(service.findById(hero.id)).toEqual(hero);
    });

    it('should throw 404 if not found', () => {
      expect(() => service.update({id: 99})).toThrow(NotFoundException);
    });
  });

  describe('remove()', () => {
    it('should remove the hero', () => {
      const numberOfHeroes = service.findAll().length;
      service.remove(hero);
      expect(service.findAll().length).toBe(numberOfHeroes - 1);
      expect(() => service.findById(hero.id)).toThrow(NotFoundException);
    });

    it('should throw 404 if not found', () => {
      expect(() => service.remove({id: 99})).toThrow(NotFoundException);
    });
  });

});
