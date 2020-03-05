import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsComponentComponent } from './order-details-component.component';

describe('OrderDetailsComponentComponent', () => {
  let component: OrderDetailsComponentComponent;
  let fixture: ComponentFixture<OrderDetailsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
