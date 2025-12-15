import { Component, computed, OnInit, signal } from '@angular/core';
import { ConcertDumbComponent } from "./concert/concert.dumb.component";
import { CommonModule } from '@angular/common';
import { Evenement } from './evenement.interface';
import { HttpClient } from '@angular/common/http';
import { EvenementService } from '../../service/evenement-service';
import { NavbarSmartComponent } from '../../core/navbar/navbar.smart.component';

@Component({
  imports: [ConcertDumbComponent, CommonModule, NavbarSmartComponent],
  selector: 'app-agenda-page',
  templateUrl: './agenda.page.component.html',
  styleUrl: './agenda.page.component.scss'
})
export class AgendaPageComponent implements OnInit {

  agendaConcerts = signal<Evenement[]>([]);

  constructor(private evenementService: EvenementService) {}


  currentDate = new Date();

  // **Signal calculé** pour les concerts à venir
  upcomingConcerts = computed(() =>
    this.agendaConcerts().filter(
      (concert) => new Date(concert.date) > this.currentDate
    )
  );

  // **Signal calculé** pour les concerts passés
  pastConcerts = computed(() =>
    this.agendaConcerts().filter(
      (concert) => new Date(concert.date) <= this.currentDate
    )
  );

  ngOnInit(): void {
    this.loadEvenements();
  }

  private loadEvenements(): void {
    this.evenementService.findAll().subscribe({
      next: (dtos) => {
        const mapped: Evenement[] = dtos.map(dto => {
          const dateObj = new Date(dto.date);

          return {
            ville: dto.ville,
            lieu: dto.lieu,
            libelle: dto.libelle,
            date: dateObj,
            heure: this.formatHeure(dateObj)
          };
        });

        this.agendaConcerts.set(mapped);
      },
      error: (err) => {
        console.error('Erreur chargement événements', err);
      }
    });
    console.log(this.agendaConcerts());
  }

  private formatHeure(date: Date): string {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
