import { TestBed } from '@angular/core/testing';

import { DataExplorerPocService } from './data-explorer-poc.service';

describe('DataExplorerPocService', () => {
  let service: DataExplorerPocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataExplorerPocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
