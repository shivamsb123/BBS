import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreMasterComponent } from './tyre-master.component';

describe('TyreMasterComponent', () => {
  let component: TyreMasterComponent;
  let fixture: ComponentFixture<TyreMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
