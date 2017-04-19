import { TestBed, inject } from '@angular/core/testing';

import { NoRankService } from './no-rank.service';

describe('NoRankService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoRankService]
    });
  });

  it('should ...', inject([NoRankService], (service: NoRankService) => {
    expect(service).toBeTruthy();
  }));
});
