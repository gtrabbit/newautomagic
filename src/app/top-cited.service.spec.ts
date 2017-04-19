import { TestBed, inject } from '@angular/core/testing';

import { TopCitedService } from './top-cited.service';

describe('TopCitedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopCitedService]
    });
  });

  it('should ...', inject([TopCitedService], (service: TopCitedService) => {
    expect(service).toBeTruthy();
  }));
});
