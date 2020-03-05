import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTemplateComponentComponent } from './order-template-component.component';

describe('OrderTemplateComponentComponent', () => {
  let component: OrderTemplateComponentComponent;
  let fixture: ComponentFixture<OrderTemplateComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTemplateComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTemplateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
