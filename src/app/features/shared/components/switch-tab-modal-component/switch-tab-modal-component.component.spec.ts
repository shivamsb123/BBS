import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchTabModalComponentComponent } from './switch-tab-modal-component.component';

describe('SwitchTabModalComponentComponent', () => {
  let component: SwitchTabModalComponentComponent;
  let fixture: ComponentFixture<SwitchTabModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchTabModalComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchTabModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
