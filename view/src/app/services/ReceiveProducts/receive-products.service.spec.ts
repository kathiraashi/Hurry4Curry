import { TestBed, inject } from '@angular/core/testing';

import { ReceiveProductsService } from './receive-products.service';

describe('ReceiveProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiveProductsService]
    });
  });

  it('should be created', inject([ReceiveProductsService], (service: ReceiveProductsService) => {
    expect(service).toBeTruthy();
  }));
});
