import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreModeUpdateComponent } from './tyre-mode-update.component';

describe('TyreModeUpdateComponent', () => {
  let component: TyreModeUpdateComponent;
  let fixture: ComponentFixture<TyreModeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreModeUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreModeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
