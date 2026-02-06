import { TestBed } from '@angular/core/testing';

import { SchoolData } from './school-data';

describe('SchoolData', () => {
  let service: SchoolData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
