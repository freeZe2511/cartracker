import { TestBed } from '@angular/core/testing';

import { ConvertService } from './convert.service';

describe('ConvertService', () => {
  let service: ConvertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert time from objId', () => {
    let objID = "3a45b78C810c19729de860ea";
    let date = service.convertTimeFromObjID(objID);
    //expect(date).toMatch("Wed Dec 24 2000 - 09:45:00 GMT+0100 (Mitteleuropäische Normalzeit)");
    expect(date.getDate()).toBe(24);
    expect(date.getFullYear()).toBe(2000);
  });
});
