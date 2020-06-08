import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLoginTypeOrderComponent } from './select-login-type-order.component';

describe('SelectLoginTypeOrderComponent', () => {
  let component: SelectLoginTypeOrderComponent;
  let fixture: ComponentFixture<SelectLoginTypeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLoginTypeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLoginTypeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
