import { TestBed } from '@angular/core/testing';

import { PointHitService } from './point-hit.service';

describe('PointHitService', () => {
  let service: PointHitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointHitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
