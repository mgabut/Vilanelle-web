import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Score {
  id: number;
  filename: string;
  filepath: string;
  uploadDate: string;
}

@Injectable({
  providedIn: 'root'
})


export class ScoreService {

  private apiUrl = 'http://localhost:9001/api/partitions'; // URL de ton backend

  constructor(private http: HttpClient) {}

  uploadScore(file: File): Observable<Score> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Score>(this.apiUrl, formData);
  }

  getScore(): Observable<Score[]> {
    return this.http.get<Score[]>(this.apiUrl);
  }

  deleteScore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}