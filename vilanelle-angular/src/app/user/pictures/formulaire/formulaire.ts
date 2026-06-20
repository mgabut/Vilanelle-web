import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PhotoService } from '../../../service/photo-service';

@Component({
  selector: 'app-formulaire',
  imports: [FormsModule],
  templateUrl: './formulaire.html',
  styleUrl: './formulaire.css',
})
export class Formulaire {
  @Output() photoUploaded = new EventEmitter<void>();

  title: string = '';
  albumName: string = '';
  photoMonth: number | null = null;
  photoYear: number | null = null;
  visibleOnHome: boolean = false;
  selectedFile: File | null = null;
  uploading: boolean = false;
  error: string = '';

  readonly months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  readonly years: number[] = (() => {
    const current = new Date().getFullYear();
    const result: number[] = [];
    for (let y = current; y >= 2000; y--) result.push(y);
    return result;
  })();

  constructor(private photoService: PhotoService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  submit(): void {
    if (!this.selectedFile) return;

    this.uploading = true;
    this.error = '';

    this.photoService.upload(this.title, this.selectedFile, this.visibleOnHome, this.albumName, this.photoMonth, this.photoYear).subscribe({
      next: () => {
        this.title = '';
        this.albumName = '';
        this.photoMonth = null;
        this.photoYear = null;
        this.visibleOnHome = false;
        this.selectedFile = null;
        this.uploading = false;
        this.photoUploaded.emit();
      },
      error: () => {
        this.error = "Erreur lors de l'upload.";
        this.uploading = false;
      }
    });
  }
}
