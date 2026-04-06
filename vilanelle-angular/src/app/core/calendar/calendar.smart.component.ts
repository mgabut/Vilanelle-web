import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import { CalendarService } from '../../service/calendarService';
import { AuthService } from '../../service/auth-service';
import { CalendarEvent } from '../../model/calendar-event';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarEventDto } from '../../dto/calendarEventDto';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.smart.component.html',
  styleUrl: './calendar.smart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarSmartComponent implements OnInit {
  isAdmin = false;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    locale: 'frLocale',
    firstDay: 1,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },

    buttonText: {
      today: "Aujourd'hui",
      month: "Mois",
      week: "Semaine",
      day: "Jour"
    },

    weekends: true,
    editable: false,
    selectable: false,
    slotMinTime: '07:00:00',
    nowIndicator: true,
    allDaySlot: true,
    height: 'auto',
    events: [],

    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    eventResize: this.handleEventResize.bind(this)
  };

  constructor(
    private calendarService: CalendarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    this.calendarOptions = {
      ...this.calendarOptions,
      editable: this.isAdmin,
      selectable: this.isAdmin
    };

    this.loadEvents();
  }

  private loadEvents(): void {
    this.calendarService.findAll().subscribe({
      next: (events: CalendarEventDto[]) => {
        this.calendarOptions = {
          ...this.calendarOptions,
          events: events.map(event => this.toEventInput(event))
        };
      },
      error: (err) => {
        console.error('Erreur lors du chargement des événements :', err);
      }
    });
  }

  private toEventInput(event: CalendarEventDto): EventInput {
    return {
      id: String(event.id),
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay
    };
  }

  handleDateClick(arg: DateClickArg): void {
    if (!this.isAdmin) return;

    const title = prompt('Titre de l’événement :');
    if (!title || !title.trim()) return;

    const newEvent = new CalendarEventDto(
      0, 
      title.trim(),
      arg.dateStr,
      arg.dateStr,
      arg.allDay,
      ''
    );

    this.calendarService.save(newEvent);
  }

  handleEventClick(arg: EventClickArg): void {
    if (!this.isAdmin) return;

    const action = prompt(
      `Événement : "${arg.event.title}"\nTape "delete" pour supprimer ou saisis un nouveau titre :`
    );

    if (!action || !action.trim()) return;

    if (action.trim().toLowerCase() === 'delete') {
      this.calendarService.deleteById(Number(arg.event.id));
      return;
    }

    const updatedEvent = new CalendarEventDto(
      Number(arg.event.id),
      action.trim(),
      arg.event.start?.toISOString() ?? '',
      arg.event.end?.toISOString() ?? '',
      arg.event.allDay,
      ''
    );

    this.calendarService.save(updatedEvent);
  }

  handleEventDrop(arg: EventDropArg): void {
    if (!this.isAdmin) {
      arg.revert();
      return;
    }

    const updatedEvent = new CalendarEventDto(
      Number(arg.event.id),
      arg.event.title,
      arg.event.start?.toISOString() ?? '',
      arg.event.end?.toISOString() ?? '',
      arg.event.allDay,
      ''
    );

    this.calendarService.save(updatedEvent);
  }

  handleEventResize(arg: EventResizeDoneArg): void {
    if (!this.isAdmin) {
      arg.revert();
      return;
    }

    const updatedEvent = new CalendarEventDto(
      Number(arg.event.id),
      arg.event.title,
      arg.event.start?.toISOString() ?? '',
      arg.event.end?.toISOString() ?? '',
      arg.event.allDay,
      ''
    );

    this.calendarService.save(updatedEvent);
  }
}