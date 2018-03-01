import { TestBed, inject } from '@angular/core/testing';

import { SalesInventService } from './sales-invent.service';

describe('SalesInventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesInventService]
    });
  });

  it('should be created', inject([SalesInventService], (service: SalesInventService) => {
    expect(service).toBeTruthy();
  }));
});
