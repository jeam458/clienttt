import { TestBed } from '@angular/core/testing';

import { PagospaypalService } from './pagospaypal.service';

describe('PagospaypalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagospaypalService = TestBed.get(PagospaypalService);
    expect(service).toBeTruthy();
  });
});
