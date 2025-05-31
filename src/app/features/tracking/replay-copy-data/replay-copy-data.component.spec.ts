import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayCopyDataComponent } from './replay-copy-data.component';

describe('ReplayCopyDataComponent', () => {
  let component: ReplayCopyDataComponent;
  let fixture: ComponentFixture<ReplayCopyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplayCopyDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplayCopyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
