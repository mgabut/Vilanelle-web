import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Affiche } from "../model/affiche";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AfficheService {
  private apiUrl = '/affiche';

  constructor(private http: HttpClient) {}

  getAfficheImageUrl(id: number): string {
    return `${environment.apiUrl}/affiche/${id}/image`;
  }

  getAll(): Observable<Affiche[]> {
    return this.http.get<Affiche[]>(this.apiUrl);
  }

  upload(file: File, position: number): Observable<Affiche> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('position', String(position));
    return this.http.post<Affiche>(this.apiUrl, formData);
  }

  updatePosition(id: number, position: number): Observable<Affiche> {
    return this.http.patch<Affiche>(`${this.apiUrl}/${id}/position`, { position });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
