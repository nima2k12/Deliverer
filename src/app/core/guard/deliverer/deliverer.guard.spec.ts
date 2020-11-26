import { TestBed } from '@angular/core/testing';

import { DelivererGuard } from './deliverer.guard';

describe('AdminGuard', () => {
  let guard: DelivererGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DelivererGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
