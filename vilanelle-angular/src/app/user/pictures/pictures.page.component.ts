import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavuserSmartComponent } from '../../core/navuser/navuser.smart.component';
import { PhotoService } from '../../service/photo-service';
import { Photo } from '../../model/photo';

@Component({
  selector: 'app-pictures',
  imports: [NavuserSmartComponent, FormsModule],
  templateUrl: './pictures.page.component.html',
  styleUrl: './pictures.page.component.css',
})
export class PicturesPageComponent implements OnInit {
  private allPhotos: Photo[] = [];
  selectedPhoto: Photo | null = null;
  sortMode: 'date' | 'album' = 'date';
  searchQuery: string = '';

  private readonly monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  constructor(public photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getAllPhotos().subscribe({
      next: (data) => { this.allPhotos = data; },
      error: (err) => { console.error(err); }
    });
  }

  get filteredPhotos(): Photo[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.allPhotos;
    return this.allPhotos.filter(p => p.albumName?.toLowerCase().includes(q));
  }

  get sortedPhotos(): Photo[] {
    return [...this.filteredPhotos].sort((a, b) => {
      const yearDiff = (b.photoYear ?? 0) - (a.photoYear ?? 0);
      if (yearDiff !== 0) return yearDiff;
      return (b.photoMonth ?? 0) - (a.photoMonth ?? 0);
    });
  }

  get albumGroups(): { albumName: string; label: string; photos: Photo[] }[] {
    const map = new Map<string, Photo[]>();
    for (const photo of this.filteredPhotos) {
      const key = photo.albumName || 'Sans album';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(photo);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b, 'fr'))
      .map(([albumName, photos]) => ({
        albumName,
        label: albumName,
        photos: photos.sort((a, b) => {
          const yearDiff = (b.photoYear ?? 0) - (a.photoYear ?? 0);
          if (yearDiff !== 0) return yearDiff;
          return (b.photoMonth ?? 0) - (a.photoMonth ?? 0);
        })
      }));
  }

  monthLabel(photo: Photo): string {
    if (!photo.photoMonth || !photo.photoYear) return '';
    return `${this.monthNames[photo.photoMonth - 1]} ${photo.photoYear}`;
  }

  openPhoto(photo: Photo): void {
    this.selectedPhoto = photo;
  }

  closePhoto(): void {
    this.selectedPhoto = null;
  }
}
