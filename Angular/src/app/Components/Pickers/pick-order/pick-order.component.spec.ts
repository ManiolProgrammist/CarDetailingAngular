import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOrderComponent } from './pick-order.component';

describe('PickOrderComponent', () => {
  let component: PickOrderComponent;
  let fixture: ComponentFixture<PickOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
