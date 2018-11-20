import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { HelloService } from './hello.service';

describe('HelloService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HelloService],
    });
  });

  it('should be created', inject([HelloService], (service: HelloService) => {
    expect(service).toBeTruthy();
  }));
});
