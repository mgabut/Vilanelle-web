import { Component, signal } from '@angular/core';
import { FeatureCardListDumbComponent } from './feature-card-list/feature-card-list.dumb.component';
import { NavbarSmartComponent } from '../../core/navbar/navbar.smart.component';
import { PhotoService } from '../../service/photo-service';

@Component({
  imports: [NavbarSmartComponent],
  selector: 'app-home-page',
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss'
})
export class HomePageComponent {

  homePhotos: any[] = [];
  selectedPhoto: any = null;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadHomePhotos();
  }

  loadHomePhotos(): void {
    this.photoService.getHomePhotos().subscribe({
      next: (photos) => {
        this.homePhotos = photos;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des photos', err);
      }
    });
  }

  openPhoto(photo: any): void {
    this.selectedPhoto = photo;
  }

  closePhoto(): void {
    this.selectedPhoto = null;
  }

}
