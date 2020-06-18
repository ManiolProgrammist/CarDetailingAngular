import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptOrderInfoComponent } from './accept-order-info.component';

describe('AcceptOrderInfoComponent', () => {
  let component: AcceptOrderInfoComponent;
  let fixture: ComponentFixture<AcceptOrderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptOrderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
