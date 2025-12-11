import { Component, computed, signal } from '@angular/core';
import { ConcertDumbComponent } from "./concert/concert.dumb.component";
import { CommonModule } from '@angular/common';

@Component({
  imports: [ConcertDumbComponent, CommonModule],
  selector: 'app-agenda-page',
  templateUrl: './agenda.page.component.html',
  styleUrl: './agenda.page.component.scss'
})
export class AgendaPageComponent {
  agendaConcerts = signal([
    {
      place: 'Place 1',
      date: new Date('2021-09-01'),
      city: 'City 1',
      hour: 1,
    },
    {
      place: 'Place 2',
      date: new Date('2021-09-02'),
      city: 'City 2',
      hour: 2,
    },
    {
      place: 'Place 3',
      date: new Date('2021-09-03'),
      city: 'City 3',
      hour: 3,
    },
  ]);

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
}
