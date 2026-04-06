import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCalendarPageComponent } from './admin-calendar.page.component';

describe('AdminCalendarPageComponent', () => {
  let component: AdminCalendarPageComponent;
  let fixture: ComponentFixture<AdminCalendarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCalendarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCalendarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
