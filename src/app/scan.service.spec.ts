import { TestBed, inject } from '@angular/core/testing';

import { ScanService } from './scan.service';

describe('ScanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScanService]
    });
  });

  it('should ...', inject([ScanService], (service: ScanService) => {
    expect(service).toBeTruthy();
  }));
});
