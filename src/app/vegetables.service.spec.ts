import { TestBed } from '@angular/core/testing';

import { VegetablesService } from './vegetables.service';

describe('VegetablesService', () => {
  let service: VegetablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VegetablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
