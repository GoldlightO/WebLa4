import { TestBed } from '@angular/core/testing';

import { PointUpdateService } from './point-update.service';

describe('PointUpdateService', () => {
  let service: PointUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
