import { Component, computed, OnInit, signal } from '@angular/core';
import { ConcertDumbComponent } from "./concert/concert.dumb.component";
import { Evenement } from './evenement.interface';
import { EvenementService } from '../../service/evenement-service';
import { NavbarSmartComponent } from '../../core/navbar/navbar.smart.component';
import { AfficheService } from '../../service/affiche.service';
import { Affiche } from '../../model/affiche';

@Component({
  imports: [ConcertDumbComponent, NavbarSmartComponent],
  selector: 'app-agenda-page',
  templateUrl: './agenda.page.component.html',
  styleUrl: './agenda.page.component.scss'
})
export class AgendaPageComponent implements OnInit {

  agendaConcerts = signal<Evenement[]>([]);
  affiches = signal<Affiche[]>([]);
  selectedAffiche = signal<Affiche | null>(null);

  constructor(
    private evenementService: EvenementService,
    public afficheService: AfficheService
  ) {}

  currentDate = new Date();

  upcomingConcerts = computed(() =>
    this.agendaConcerts().filter(
      (concert) => new Date(concert.date) > this.currentDate
    )
  );

  pastConcerts = computed(() =>
    this.agendaConcerts().filter(
      (concert) => new Date(concert.date) <= this.currentDate
    )
  );

  ngOnInit(): void {
    this.loadEvenements();
    this.loadAffiches();
  }

  openAffiche(affiche: Affiche): void {
    this.selectedAffiche.set(affiche);
  }

  closeAffiche(): void {
    this.selectedAffiche.set(null);
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
      error: (err) => console.error('Erreur chargement événements', err)
    });
  }

  private loadAffiches(): void {
    this.afficheService.getAll().subscribe({
      next: (data) => this.affiches.set(data),
      error: (err) => console.error('Erreur chargement affiches', err)
    });
  }

  private formatHeure(date: Date): string {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
}
