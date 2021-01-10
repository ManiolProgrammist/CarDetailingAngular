import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsComponentComponent } from './account-settings-component.component';

describe('AccountSettingsComponentComponent', () => {
  let component: AccountSettingsComponentComponent;
  let fixture: ComponentFixture<AccountSettingsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
