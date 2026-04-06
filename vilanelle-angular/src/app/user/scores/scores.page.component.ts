import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartitionDto } from '../../dto/partition-dto';
import { PartitionService } from '../../service/PartitionService';
import { Observable } from 'rxjs';
import { NavuserSmartComponent } from '../../core/navuser/navuser.smart.component';


@Component({
  imports: [CommonModule, NavuserSmartComponent],
  templateUrl: './scores.page.component.html',
  styleUrl: './scores.page.component.scss',
  selector: 'app-scores-page'
})


export class ScoresPageComponent {

  protected partition$!: Observable<PartitionDto[]>;

  constructor(private partitionService: PartitionService) {}

  ngOnInit(): void {
    this.partition$ = this.partitionService.findAll();
  }

  public downloadPartition(partition: PartitionDto): void {
    this.partitionService.downloadById(partition.id).subscribe({
      next: (blob: Blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = partition.pdfName || 'partition.pdf';
        link.click();
        window.URL.revokeObjectURL(fileURL);
      },
      error: (error) => {
        console.error('Erreur lors du téléchargement :', error);
        alert('Impossible de télécharger la partition.');
      }
    });
  }

  public downloadAudio(partition: PartitionDto): void {
    this.partitionService.downloadAudioById(partition.id).subscribe({
      next: (blob: Blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = partition.audioName || 'audio.mp3';
        link.click();
        window.URL.revokeObjectURL(fileURL);
      },
      error: (error) => {
        console.error('Erreur lors du téléchargement de l’audio :', error);
        alert('Impossible de télécharger le fichier audio.');
      }
    });
  }

  public trackPartition(index: number, value: PartitionDto): number {
    return value.id;
  }
}