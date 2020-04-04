import { TestBed } from '@angular/core/testing';

import { SunAPIService } from './sun-api.service';

describe('SunAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SunAPIService = TestBed.get(SunAPIService);
    expect(service).toBeTruthy();
  });
});
