import { Component } from '@angular/core';
import { NavuserSmartComponent } from '../../core/navuser/navuser.smart.component';
import { CalendarSmartComponent } from '../../core/calendar/calendar.smart.component';

@Component({
  selector: 'app-user-calendar',
  imports: [CalendarSmartComponent, NavuserSmartComponent],
  templateUrl: './user-calendar.page.component.html',
  styleUrl: './user-calendar.page.component.css',
})
export class UserCalendarPageComponent {

}
