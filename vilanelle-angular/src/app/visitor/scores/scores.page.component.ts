import { Component, OnInit } from '@angular/core';
import { Score, ScoreService } from './scores.service';
import { CommonModule } from '@angular/common';


@Component({
  imports: [CommonModule],
  templateUrl: './scores.page.component.html',
  styleUrl: './scores.page.component.scss',
  selector: 'app-scores-page'
})


export class ScoresPageComponent implements OnInit {

  selectedFile!: File;
  scores: Score[] = [];

  constructor(private scoreService: ScoreService) { } 

  ngOnInit(): void {
    this.loadScores();
  }

  loadScores(): void {
    this.scoreService.getScore().subscribe({
      next: (docs) => {
        this.scores = docs;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadScore(): void {
    if (!this.selectedFile) {
      alert('Sélectionne un fichier avant d\'envoyer.');
      return;
    }

    this.scoreService.uploadScore(this.selectedFile).subscribe({
      next: (response) => {
        console.log('Score uploadé', response);
        this.loadScores(); // Recharge après ajout
      },
      error: (error) => {
        console.error('Erreur lors de l\'upload du score', error);
      }
    });
  }

  deleteScore(id: number): void {
    if (confirm('Es-tu sûr de vouloir supprimer ce score ?')) {
      this.scoreService.deleteScore(id).subscribe({
        next: () => {
          console.log('Score supprimé');
          this.loadScores(); // Recharge après suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      });
    }
  }


}
