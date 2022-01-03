import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoWindowComponent } from './user-info-window.component';

describe('UserInfoWindowComponent', () => {
  let component: UserInfoWindowComponent;
  let fixture: ComponentFixture<UserInfoWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoWindowComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
