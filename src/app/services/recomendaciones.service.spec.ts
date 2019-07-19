import { TestBed } from '@angular/core/testing';

import { RecomendacionesService } from './recomendaciones.service';

describe('RecomendacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecomendacionesService = TestBed.get(RecomendacionesService);
    expect(service).toBeTruthy();
  });
});
