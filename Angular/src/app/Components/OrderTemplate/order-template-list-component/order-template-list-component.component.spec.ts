import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTemplateListComponentComponent } from './order-template-list-component.component';

describe('OrderTemplateListComponentComponent', () => {
  let component: OrderTemplateListComponentComponent;
  let fixture: ComponentFixture<OrderTemplateListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTemplateListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTemplateListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
