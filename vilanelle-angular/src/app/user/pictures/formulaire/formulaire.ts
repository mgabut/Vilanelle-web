import { Component } from '@angular/core';
import { PhotoService } from '../../../service/photo-service';

@Component({
  selector: 'app-formulaire',
  imports: [],
  templateUrl: './formulaire.html',
  styleUrl: './formulaire.css',
})
export class Formulaire {
  title: string = '';
  visibleOnHome: boolean = false;
  selectedFile: File | null = null;

  constructor(private photoService: PhotoService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadPhoto(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('title', this.title);
    formData.append('visibleOnHome', String(this.visibleOnHome));

    this.photoService.uploadPhoto(formData).subscribe({
      next: (response) => {
        console.log('Photo uploadée avec succès', response);
        this.title = '';
        this.visibleOnHome = false;
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Erreur upload photo', err);
      }
    });
  }
}
