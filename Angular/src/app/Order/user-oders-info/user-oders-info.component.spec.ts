import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOdersInfoComponent } from './user-oders-info.component';

describe('UserOdersInfoComponent', () => {
  let component: UserOdersInfoComponent;
  let fixture: ComponentFixture<UserOdersInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOdersInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOdersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
