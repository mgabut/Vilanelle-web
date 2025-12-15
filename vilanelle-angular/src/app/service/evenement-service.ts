import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { EvenementDto } from '../dto/evenement-dto';

@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  private apiUrl: string = '/evenement';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  public findAll(): Observable<EvenementDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => this.http.get<EvenementDto[]>(this.apiUrl))
    );
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<EvenementDto> {
    return this.http.get<EvenementDto>(`${this.apiUrl}/${id}`);
  }

  public save(evenementDto: EvenementDto): void {
    const payload = evenementDto.toJson();

    if (!evenementDto.id) {
      this.http.post<EvenementDto>(this.apiUrl, payload)
        .subscribe(() => this.refresh());
    } else {
      this.http.put<EvenementDto>(`${this.apiUrl}/${evenementDto.id}`, payload)
        .subscribe(() => this.refresh());
    }
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => this.refresh());
  }
}