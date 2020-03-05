import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOrderThisComponent } from './order-order-this.component';

describe('OrderOrderThisComponent', () => {
  let component: OrderOrderThisComponent;
  let fixture: ComponentFixture<OrderOrderThisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderOrderThisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOrderThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
