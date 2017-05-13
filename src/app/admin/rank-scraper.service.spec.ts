import { TestBed, inject } from '@angular/core/testing';

import { RankScraperService } from './rank-scraper.service';

describe('RankScraperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RankScraperService]
    });
  });

  it('should ...', inject([RankScraperService], (service: RankScraperService) => {
    expect(service).toBeTruthy();
  }));
});
