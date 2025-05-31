import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalRepairDetailsComponent } from './terminal-repair-details.component';

describe('TerminalRepairDetailsComponent', () => {
  let component: TerminalRepairDetailsComponent;
  let fixture: ComponentFixture<TerminalRepairDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalRepairDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminalRepairDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
