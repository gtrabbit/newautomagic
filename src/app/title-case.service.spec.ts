import { TestBed, inject } from '@angular/core/testing';

import { TitleCaseService } from './title-case.service';

describe('TitleCaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitleCaseService]
    });
  });

  it('should ...', inject([TitleCaseService], (service: TitleCaseService) => {
    expect(service).toBeTruthy();
  }));
});
