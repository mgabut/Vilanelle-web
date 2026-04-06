import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSmartComponent } from './calendar.smart.component';

describe('CalendarSmartComponent', () => {
  let component: CalendarSmartComponent;
  let fixture: ComponentFixture<CalendarSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
