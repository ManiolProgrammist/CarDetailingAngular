import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTemplateDetailsComponentComponent } from './order-template-details-component.component';

describe('OrderTemplateDetailsComponentComponent', () => {
  let component: OrderTemplateDetailsComponentComponent;
  let fixture: ComponentFixture<OrderTemplateDetailsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTemplateDetailsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTemplateDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
