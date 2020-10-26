import { TestBed } from '@angular/core/testing';

import { NonAuthGuard } from './non-auth.guard';

describe('NonAuthGuard', () => {
  let service: NonAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
