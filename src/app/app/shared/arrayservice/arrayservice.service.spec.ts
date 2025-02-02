import { TestBed } from '@angular/core/testing';

import { ArrayserviceService } from './arrayservice.service';

describe('ArrayserviceService', () => {
  let service: ArrayserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
