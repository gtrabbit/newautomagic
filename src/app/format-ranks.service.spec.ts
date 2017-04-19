import { TestBed, inject } from '@angular/core/testing';

import { FormatRanksService } from './format-ranks.service';

describe('FormatRanksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatRanksService]
    });
  });

  it('should ...', inject([FormatRanksService], (service: FormatRanksService) => {
    expect(service).toBeTruthy();
  }));
});
