import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryUserInfoOrderComponent } from './temporary-user-info-order.component';

describe('TemporaryUserInfoOrderComponent', () => {
  let component: TemporaryUserInfoOrderComponent;
  let fixture: ComponentFixture<TemporaryUserInfoOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporaryUserInfoOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryUserInfoOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
