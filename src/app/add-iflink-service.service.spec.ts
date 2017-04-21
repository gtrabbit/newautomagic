import { TestBed, inject } from '@angular/core/testing';

import { AddIFLinkServiceService } from './add-iflink-service.service';

describe('AddIFLinkServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddIFLinkServiceService]
    });
  });

  it('should ...', inject([AddIFLinkServiceService], (service: AddIFLinkServiceService) => {
    expect(service).toBeTruthy();
  }));
});
