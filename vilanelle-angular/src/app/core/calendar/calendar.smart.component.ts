import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import frLocale from '@fullcalendar/core/locales/fr';
import { CalendarService } from '../../service/calendarService';
import { AuthService } from '../../service/auth-service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarEventDto } from '../../dto/calendarEventDto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, FormsModule, CommonModule],
  templateUrl: './calendar.smart.component.html',
  styleUrl: './calendar.smart.component.css',
})
export class CalendarSmartComponent implements OnInit {

  isAdmin = false;

  showModal = false;
  modalMode: 'add' | 'edit' | 'view' = 'add';

  formData = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    description: '',
    recurrence: 'none' as 'none' | 'weekly' | 'biweekly' | 'monthly',
    recurrenceUntil: ''
  };

  viewData = { title: '', start: '', end: '', description: '', isRecurring: false };
  editingId: number | null = null;

  readonly recurrenceOptions: Array<{ value: 'none' | 'weekly' | 'biweekly' | 'monthly'; label: string }> = [
    { value: 'none',     label: 'Aucune' },
    { value: 'weekly',   label: 'Hebdomadaire' },
    { value: 'biweekly', label: 'Toutes les 2 semaines' },
    { value: 'monthly',  label: 'Mensuelle' }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin],
    initialView: 'timeGridWeek',
    locale: frLocale,
    firstDay: 1,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    buttonText: {
      today: "Aujourd'hui",
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour'
    },
    weekends: true,
    editable: false,
    selectable: false,
    slotMinTime: '07:00:00',
    nowIndicator: true,
    allDaySlot: false,
    height: 'auto',
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    eventResize: this.handleEventResize.bind(this)
  };

  constructor(
    private calendarService: CalendarService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
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
          events: events.map(e => this.toEventInput(e))
        };
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Erreur chargement événements :', err)
    });
  }

  private toEventInput(event: CalendarEventDto): EventInput {
    const base: EventInput = {
      id: String(event.id),
      title: event.title,
      allDay: event.allDay,
      extendedProps: {
        description: event.description,
        rrule: event.rrule
      }
    };

    if (event.rrule) {
      return {
        ...base,
        // Le plugin rrule lit la propriété "rrule" directement
        rrule: event.rrule,
        duration: event.duration ?? undefined
      } as any;
    }

    return {
      ...base,
      start: event.start,
      end: event.end || undefined
    };
  }

  // --- Clic sur une date : ouvre la modal d'ajout (admin) ---
  handleDateClick(arg: DateClickArg): void {
    if (!this.isAdmin) return;
    const start = this.dateToLocalIso(arg.date);
    const endDate = new Date(arg.date.getTime() + 60 * 60 * 1000);
    const end = arg.allDay ? start : this.dateToLocalIso(endDate);
    this.formData = {
      title: '',
      start: this.isoToDatetimeLocal(start),
      end: this.isoToDatetimeLocal(end),
      allDay: arg.allDay,
      description: '',
      recurrence: 'none',
      recurrenceUntil: ''
    };
    this.editingId = null;
    this.modalMode = 'add';
    this.showModal = true;
  }

  // --- Clic sur un événement : édition (admin) ou lecture (user) ---
  handleEventClick(arg: EventClickArg): void {
    const rrule = (arg.event.extendedProps['rrule'] as string) ?? '';
    const description = (arg.event.extendedProps['description'] as string) ?? '';
    const clickedStart = arg.event.start ?? new Date();

    if (this.isAdmin) {
      let startStr: string;
      let recurrence: 'none' | 'weekly' | 'biweekly' | 'monthly' = 'none';
      let recurrenceUntil = '';

      if (rrule) {
        // Récupérer DTSTART depuis la règle pour éditer la série complète
        startStr = this.isoToDatetimeLocal(this.dtstartFromRrule(rrule) || this.dateToLocalIso(clickedStart));
        const parsed = this.parseRrule(rrule);
        recurrence = parsed.recurrence;
        recurrenceUntil = parsed.until;
      } else {
        startStr = this.isoToDatetimeLocal(this.dateToLocalIso(clickedStart));
      }

      const end = arg.event.end ? this.isoToDatetimeLocal(this.dateToLocalIso(arg.event.end)) : startStr;

      this.formData = {
        title: arg.event.title,
        start: startStr,
        end,
        allDay: arg.event.allDay,
        description,
        recurrence,
        recurrenceUntil
      };
      this.editingId = Number(arg.event.id);
      this.modalMode = 'edit';
    } else {
      this.viewData = {
        title: arg.event.title,
        start: this.dateToLocalIso(clickedStart),
        end: arg.event.end ? this.dateToLocalIso(arg.event.end) : '',
        description,
        isRecurring: !!rrule
      };
      this.modalMode = 'view';
    }
    this.showModal = true;
  }

  // Les événements récurrents ne sont pas déplaçables (annuler le drop)
  handleEventDrop(arg: EventDropArg): void {
    if (!this.isAdmin || arg.event.extendedProps['rrule']) { arg.revert(); return; }
    this.calendarService.save(new CalendarEventDto(
      Number(arg.event.id),
      arg.event.title,
      this.dateToLocalIso(arg.event.start ?? new Date()),
      arg.event.end ? this.dateToLocalIso(arg.event.end) : '',
      arg.event.allDay,
      (arg.event.extendedProps['description'] as string) ?? ''
    ));
  }

  handleEventResize(arg: EventResizeDoneArg): void {
    if (!this.isAdmin || arg.event.extendedProps['rrule']) { arg.revert(); return; }
    this.calendarService.save(new CalendarEventDto(
      Number(arg.event.id),
      arg.event.title,
      this.dateToLocalIso(arg.event.start ?? new Date()),
      arg.event.end ? this.dateToLocalIso(arg.event.end) : '',
      arg.event.allDay,
      (arg.event.extendedProps['description'] as string) ?? ''
    ));
  }

  // --- Validation ---
  get formIsValid(): boolean {
    if (!this.formData.title.trim()) return false;
    if (this.formData.recurrence !== 'none' && !this.formData.recurrenceUntil) return false;
    return true;
  }

  // --- Sauvegarde ---
  saveEvent(): void {
    if (!this.formIsValid) return;

    let rrule: string | null = null;
    let duration: string | null = null;

    if (this.formData.recurrence !== 'none') {
      rrule = this.buildRrule(
        this.formData.start,
        this.formData.recurrence,
        this.formData.recurrenceUntil
      );
      duration = this.computeDuration(this.formData.start, this.formData.end);
    }

    this.calendarService.save(new CalendarEventDto(
      this.editingId ?? 0,
      this.formData.title.trim(),
      this.datetimeLocalToIso(this.formData.start),
      rrule ? '' : this.datetimeLocalToIso(this.formData.end),
      this.formData.allDay,
      this.formData.description,
      rrule,
      duration
    ));
    this.closeModal();
  }

  deleteEvent(): void {
    if (this.editingId === null) return;
    this.calendarService.deleteById(this.editingId);
    this.closeModal();
  }

  closeModal(): void {
    this.showModal = false;
    this.editingId = null;
  }

  // --- Construction de la règle de récurrence ---
  private buildRrule(start: string, freq: 'weekly' | 'biweekly' | 'monthly', until: string): string {
    // start "2024-06-20T19:00" → DTSTART "20240620T190000"
    const [datePart, timePart] = start.split('T');
    const dtstart = datePart.replace(/-/g, '') + 'T' + timePart.replace(':', '') + '00';

    // until "2024-12-31" → "20241231T235959"
    const untilStr = until.replace(/-/g, '') + 'T235959';

    const freqMap = {
      weekly:   'FREQ=WEEKLY',
      biweekly: 'FREQ=WEEKLY;INTERVAL=2',
      monthly:  'FREQ=MONTHLY'
    };

    return `DTSTART:${dtstart}\nRRULE:${freqMap[freq]};UNTIL=${untilStr}`;
  }

  // --- Lecture de la règle pour pré-remplir le formulaire ---
  private parseRrule(rrule: string): { recurrence: 'none' | 'weekly' | 'biweekly' | 'monthly', until: string } {
    const rruleLine = rrule.split('\n').find(l => l.startsWith('RRULE:')) ?? '';
    const params = new Map(
      rruleLine.replace('RRULE:', '').split(';').map(p => p.split('=') as [string, string])
    );
    const freq = params.get('FREQ') ?? '';
    const interval = params.get('INTERVAL') ?? '1';
    const until = params.get('UNTIL') ?? '';

    let recurrence: 'none' | 'weekly' | 'biweekly' | 'monthly' = 'none';
    if (freq === 'WEEKLY' && interval === '2') recurrence = 'biweekly';
    else if (freq === 'WEEKLY') recurrence = 'weekly';
    else if (freq === 'MONTHLY') recurrence = 'monthly';

    // "20241231T235959" → "2024-12-31"
    const untilDate = until.length >= 8
      ? `${until.slice(0, 4)}-${until.slice(4, 6)}-${until.slice(6, 8)}`
      : '';

    return { recurrence, until: untilDate };
  }

  // Extrait la date de début depuis DTSTART: "DTSTART:20240620T190000" → "2024-06-20T19:00:00"
  private dtstartFromRrule(rrule: string): string {
    const dtstart = rrule.split('\n').find(l => l.startsWith('DTSTART:'))?.replace('DTSTART:', '') ?? '';
    if (dtstart.length < 15) return '';
    return `${dtstart.slice(0, 4)}-${dtstart.slice(4, 6)}-${dtstart.slice(6, 8)}T${dtstart.slice(9, 11)}:${dtstart.slice(11, 13)}:${dtstart.slice(13, 15)}`;
  }

  // Calcule la durée entre deux datetime-local → "HH:mm"
  private computeDuration(start: string, end: string): string {
    if (!start || !end) return '01:00';
    const diffMs = Math.max(new Date(end).getTime() - new Date(start).getTime(), 0);
    const h = Math.floor(diffMs / 3600000);
    const m = Math.floor((diffMs % 3600000) / 60000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  // --- Helpers de formatage ---
  private dateToLocalIso(date: Date): string {
    const p = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}T${p(date.getHours())}:${p(date.getMinutes())}:${p(date.getSeconds())}`;
  }

  private isoToDatetimeLocal(iso: string): string {
    return iso.slice(0, 16);
  }

  private datetimeLocalToIso(datetimeLocal: string): string {
    return datetimeLocal ? datetimeLocal + ':00' : '';
  }

  formatDisplay(iso: string): string {
    if (!iso) return '';
    return new Date(iso).toLocaleString('fr-FR', {
      weekday: 'long', day: '2-digit', month: 'long',
      year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  get recurrenceLabel(): string {
    return this.recurrenceOptions.find(o => o.value === this.formData.recurrence)?.label ?? '';
  }
}
