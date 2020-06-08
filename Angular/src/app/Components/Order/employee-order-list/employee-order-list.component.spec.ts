import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOrderListComponent } from './employee-order-list.component';

describe('EmployeeOrderListComponent', () => {
  let component: EmployeeOrderListComponent;
  let fixture: ComponentFixture<EmployeeOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
