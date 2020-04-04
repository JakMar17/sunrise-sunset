import { TestBed } from '@angular/core/testing';

import { TimeConvertService } from './time-convert.service';

describe('TimeConvertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeConvertService = TestBed.get(TimeConvertService);
    expect(service).toBeTruthy();
  });
});
