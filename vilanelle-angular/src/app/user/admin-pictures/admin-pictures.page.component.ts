import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavadminSmartComponent } from '../../core/navadmin/navadmin.smart.component';
import { Formulaire } from '../pictures/formulaire/formulaire';
import { PhotoService } from '../../service/photo-service';
import { Photo } from '../../model/photo';

@Component({
  selector: 'app-admin-pictures',
  imports: [NavadminSmartComponent, Formulaire, FormsModule],
  templateUrl: './admin-pictures.page.component.html',
  styleUrl: './admin-pictures.page.component.css',
})
export class AdminPicturesPageComponent implements OnInit {
  private allPhotos: Photo[] = [];
  photos: Photo[] = [];
  selectedPhoto: Photo | null = null;
  searchQuery = '';

  constructor(public photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.photoService.getAllPhotos().subscribe({
      next: (data) => {
        this.allPhotos = data;
        this.applyFilter();
      },
      error: (err) => { console.error(err); }
    });
  }

  applyFilter(): void {
    const q = this.searchQuery.trim().toLowerCase();
    this.photos = q
      ? this.allPhotos.filter(p => p.albumName?.toLowerCase().includes(q))
      : [...this.allPhotos];
  }

  openPhoto(photo: Photo): void {
    this.selectedPhoto = photo;
  }

  closePhoto(): void {
    this.selectedPhoto = null;
  }

  toggleVisibility(photo: Photo): void {
    const newValue = !photo.visibleOnHome;
    this.photoService.updateVisibility(photo.id, newValue).subscribe({
      next: (updated) => { photo.visibleOnHome = updated.visibleOnHome; },
      error: (err) => { console.error(err); }
    });
  }

  deletePhoto(photo: Photo, event: Event): void {
    event.stopPropagation();
    this.photoService.deletePhoto(photo.id).subscribe({
      next: () => {
        this.allPhotos = this.allPhotos.filter(p => p.id !== photo.id);
        this.applyFilter();
      },
      error: (err) => { console.error(err); }
    });
  }
}
