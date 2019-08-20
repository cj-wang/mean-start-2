import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Hero } from '../../shared/hero';

describe('HeroesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let hero: Hero;

  describe('POST /api/heroes', () => {
    it('should create new hero', () => {
      return request(app.getHttpServer())
        .post('/api/heroes')
        .send({
          name: 'New Hero',
        })
        .expect(201)
        .then(res => {
          hero = res.body;
          expect(hero.name).toBe('New Hero');
          expect(hero.id).toBeTruthy();
        });
    });
  });

  describe('GET /api/heroes', () => {
    it('should return all heroes', () => {
      return request(app.getHttpServer())
        .get('/api/heroes')
        .expect(200)
        .then(res => {
          expect(Array.isArray(res.body)).toBeTruthy();
        });
    });
  });

  describe('GET /api/heroes?name=xxx', () => {
    it('should find the heroes by name', () => {
      return request(app.getHttpServer())
        .get('/api/heroes?name=ew her')
        .expect(200)
        .expect([hero]);
    });
  });

  describe('GET /api/heroes/:id', () => {
    it('should find the hero by id', () => {
      return request(app.getHttpServer())
        .get(`/api/heroes/${hero.id}`)
        .expect(200)
        .expect(hero);
    });

    it('should throw 404 if not found', () => {
      return request(app.getHttpServer())
        .get('/api/heroes/99')
        .expect(404);
    });
  });

  describe('PUT /api/heroes/:id', () => {
    it('should update the hero', () => {
      hero.name = 'Updated Name';
      return request(app.getHttpServer())
        .put(`/api/heroes/${hero.id}`)
        .send(hero)
        .expect(200)
        .expect(hero);
    });

    it('should throw 404 if not found', () => {
      return request(app.getHttpServer())
        .put('/api/heroes/99')
        .send(hero)
        .expect(404);
    });
  });

  describe('PUT /api/heroes', () => {
    it('should update the hero', () => {
      hero.name = 'Updated Name';
      return request(app.getHttpServer())
        .put('/api/heroes')
        .send(hero)
        .expect(200)
        .expect(hero);
    });

    it('should throw 404 if not found', () => {
      return request(app.getHttpServer())
        .put('/api/heroes')
        .send({
          id: 99,
        })
        .expect(404);
    });
  });

  describe('DELETE /api/heroes/:id', () => {
    it('should return 200', () => {
      return request(app.getHttpServer())
        .delete(`/api/heroes/${hero.id}`)
        .expect(200);
    });

    it('should remove the hero', () => {
      return request(app.getHttpServer())
        .get(`/api/heroes/${hero.id}`)
        .expect(404);
    });

    it('should throw 404 if not found', () => {
      return request(app.getHttpServer())
        .delete('/api/heroes/99')
        .expect(404);
    });
  });

});
