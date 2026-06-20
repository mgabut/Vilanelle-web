import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Photo } from "../model/photo";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl: string = '/photo';

  constructor(private http: HttpClient) {}

  getPhotoImageUrl(id: number): string {
    return `${environment.apiUrl}/photo/${id}/image`;
  }

  upload(title: string, file: File, visibleOnHome: boolean, albumName: string, photoMonth: number | null, photoYear: number | null): Observable<Photo> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('visibleOnHome', String(visibleOnHome));
    if (albumName) formData.append('albumName', albumName);
    if (photoMonth) formData.append('photoMonth', String(photoMonth));
    if (photoYear) formData.append('photoYear', String(photoYear));
    return this.http.post<Photo>(this.apiUrl, formData);
  }

  getHomePhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/home`);
  }

  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl);
  }

  updateVisibility(id: number, visibleOnHome: boolean): Observable<Photo> {
    return this.http.patch<Photo>(`${this.apiUrl}/${id}/visibility`, { visibleOnHome });
  }

  deletePhoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
