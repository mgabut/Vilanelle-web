import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Photo } from "../model/photo";


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl: string = '/photos';

  constructor(private http: HttpClient) {}

  uploadPhoto(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getHomePhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/home`);
  }

  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl);
  }

  updateVisibility(id: number, visibleOnHome: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/visibility`, { visibleOnHome });
  }

  deletePhoto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatePhoto(id: number, photo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, photo);
  }
}