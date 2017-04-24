import { TestBed, inject } from '@angular/core/testing';

import { AddRankService } from './add-rank.service';

describe('AddRankService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddRankService]
    });
  });

  it('should ...', inject([AddRankService], (service: AddRankService) => {
    expect(service).toBeTruthy();
  }));
});
