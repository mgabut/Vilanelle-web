import { Component } from '@angular/core';
import { CalendarSmartComponent } from "../../core/calendar/calendar.smart.component";
import { NavadminSmartComponent } from '../../core/navadmin/navadmin.smart.component';

@Component({
  selector: 'app-admin-calendar',
  imports: [CalendarSmartComponent, NavadminSmartComponent],
  templateUrl: './admin-calendar.page.component.html',
  styleUrl: './admin-calendar.page.component.css',
})
export class AdminCalendarPageComponent {

}
