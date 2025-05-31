import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHistoryComponent } from './new-history.component';

describe('NewHistoryComponent', () => {
  let component: NewHistoryComponent;
  let fixture: ComponentFixture<NewHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
