import { TestBed } from '@angular/core/testing';

import { ShowapiService } from './showapi.service';

describe('ShowapiService', () => {
  let service: ShowapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
