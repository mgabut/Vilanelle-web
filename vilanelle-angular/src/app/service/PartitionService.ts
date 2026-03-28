import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, startWith, switchMap } from 'rxjs';
import { PartitionDto } from '../dto/partition-dto';

@Injectable({
  providedIn: 'root',
})
export class PartitionService {
  private apiUrl: string = '/partitions';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  public findAll(): Observable<PartitionDto[]> {
    return this.refresh$.pipe(
      startWith(void 0),
      switchMap(() => this.http.get<any[]>(this.apiUrl)),
      map(data => data.map(item => PartitionDto.fromJson(item)))
    );
  }

  public refresh(): void {
    this.refresh$.next();
  }

  public findById(id: number): Observable<PartitionDto> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(item => PartitionDto.fromJson(item))
    );
  }

  public create(titre: string, auteur: string, file: File): void {
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('auteur', auteur);
    formData.append('file', file);

    this.http.post<PartitionDto>(this.apiUrl, formData)
      .subscribe(() => this.refresh());
  }

  public update(partitionDto: PartitionDto): void {
    const payload = {
      titre: partitionDto.titre,
      auteur: partitionDto.auteur
    };

    this.http.put<PartitionDto>(`${this.apiUrl}/${partitionDto.id}`, payload)
      .subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => this.refresh());
  }

  public downloadById(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/download`, {
      responseType: 'blob'
    });
  }
}