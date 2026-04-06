import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCalendarPageComponent } from './user-calendar.page.component';

describe('UserCalendarPageComponent', () => {
  let component: UserCalendarPageComponent;
  let fixture: ComponentFixture<UserCalendarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCalendarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCalendarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
