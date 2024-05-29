import { TestBed } from '@angular/core/testing';

import { SssionStorageService } from './sssion-storage.service';

describe('SssionStorageService', () => {
  let service: SssionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SssionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
