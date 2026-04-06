import { Component } from '@angular/core';
import { NavadminSmartComponent } from '../../core/navadmin/navadmin.smart.component';
import { PhotoService } from '../../service/photo-service';
import { Photo } from '../../model/photo';

@Component({
  selector: 'app-pictures',
  imports: [NavadminSmartComponent],
  templateUrl: './pictures.page.component.html',
  styleUrl: './pictures.page.component.css',
})
export class PicturesPageComponent {
  photos: Photo[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.photoService.getAllPhotos().subscribe({
      next: (data) => {
        this.photos = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  toggleVisibility(photo: any): void {
    const newValue = !photo.visibleOnHome;

    this.photoService.updateVisibility(photo.id, newValue).subscribe({
      next: () => {
        photo.visibleOnHome = newValue;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
