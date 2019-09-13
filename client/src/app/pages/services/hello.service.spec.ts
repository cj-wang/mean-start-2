import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HelloService } from './hello.service';

describe('HelloService', () => {
  let service: HelloService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [HelloService],
    });
    service = TestBed.get(HelloService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#hello should call GET api/hello', () => {
    const greeting = 'Hello';
    service.hello().then(result => {
      expect(result).toBe(greeting);
    });
    const request = httpTestingController.expectOne('api/hello');
    expect(request.request.method).toBe('GET');
    request.flush({ greeting });
    httpTestingController.verify();
  });
});
