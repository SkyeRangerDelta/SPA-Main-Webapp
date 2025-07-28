import { TestBed } from '@angular/core/testing';

import { DbHandler } from './db-handler.ts';

describe('DbHandler', () => {
  let service: DbHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
