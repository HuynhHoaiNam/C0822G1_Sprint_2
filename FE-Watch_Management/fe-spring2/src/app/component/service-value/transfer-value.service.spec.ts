import { TestBed } from '@angular/core/testing';

import { TransferValueService } from './transfer-value.service';

describe('TransferValueService', () => {
  let service: TransferValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
