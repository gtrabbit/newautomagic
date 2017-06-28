import { TestBed, inject } from '@angular/core/testing';

import { GetCitingPapersService } from './get-citing-papers.service';

describe('GetCitingPapersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCitingPapersService]
    });
  });

  it('should ...', inject([GetCitingPapersService], (service: GetCitingPapersService) => {
    expect(service).toBeTruthy();
  }));
});
