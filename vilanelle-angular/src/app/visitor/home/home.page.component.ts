import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarSmartComponent } from '../../core/navbar/navbar.smart.component';
import { PhotoService } from '../../service/photo-service';
import { Photo } from '../../model/photo';

@Component({
  imports: [CommonModule, NavbarSmartComponent],
  selector: 'app-home-page',
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss'
})
export class HomePageComponent implements OnInit {

  homePhotos: Photo[] = [];
  selectedPhoto: Photo | null = null;

  constructor(public photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getHomePhotos().subscribe({
      next: (photos) => { this.homePhotos = photos; },
      error: (err) => { console.error('Erreur lors du chargement des photos', err); }
    });
  }

  openPhoto(photo: Photo): void {
    this.selectedPhoto = photo;
  }

  closePhoto(): void {
    this.selectedPhoto = null;
  }
}
