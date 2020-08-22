import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRightComponent } from './image-right.component';

describe('ImageRightComponent', () => {
  let component: ImageRightComponent;
  let fixture: ComponentFixture<ImageRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
