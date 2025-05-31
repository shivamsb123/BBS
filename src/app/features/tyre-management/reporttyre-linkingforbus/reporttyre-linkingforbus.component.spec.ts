import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporttyreLinkingforbusComponent } from './reporttyre-linkingforbus.component';

describe('ReporttyreLinkingforbusComponent', () => {
  let component: ReporttyreLinkingforbusComponent;
  let fixture: ComponentFixture<ReporttyreLinkingforbusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporttyreLinkingforbusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporttyreLinkingforbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
