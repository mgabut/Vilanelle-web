import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { CalendarEvent } from '../model/calendar-event';
import { CalendarEventDto } from '../dto/calendarEventDto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl: string = '/calendarEvent';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  public findAll(): Observable<CalendarEventDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => this.http.get<CalendarEventDto[]>(this.apiUrl))
    );
  }

  public refresh(): void {
    this.refresh$.next();
  }

  public findById(id: number): Observable<CalendarEventDto> {
    return this.http.get<CalendarEventDto>(`${this.apiUrl}/${id}`);
  }

  public save(calendarEventDto: CalendarEventDto): void {
    const payload = calendarEventDto.toJson();

    if (calendarEventDto.id === 0) {
      this.http.post<CalendarEventDto>(this.apiUrl, payload)
        .subscribe(() => this.refresh());
    } else {
      this.http.put<CalendarEventDto>(`${this.apiUrl}/${calendarEventDto.id}`, payload)
        .subscribe(() => this.refresh());
    }
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => this.refresh());
  }
}