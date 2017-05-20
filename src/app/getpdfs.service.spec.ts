import { TestBed, inject } from '@angular/core/testing';

import { GetpdfsService } from './getpdfs.service';

describe('GetpdfsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetpdfsService]
    });
  });

  it('should ...', inject([GetpdfsService], (service: GetpdfsService) => {
    expect(service).toBeTruthy();
  }));
});
