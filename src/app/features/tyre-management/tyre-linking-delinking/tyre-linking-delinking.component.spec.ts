import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreLinkingDelinkingComponent } from './tyre-linking-delinking.component';

describe('TyreLinkingDelinkingComponent', () => {
  let component: TyreLinkingDelinkingComponent;
  let fixture: ComponentFixture<TyreLinkingDelinkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreLinkingDelinkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreLinkingDelinkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
