import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgendaConcerts } from '../evenement.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-concert',
  imports: [DatePipe],
  templateUrl: './concert.dumb.component.html',
  styleUrl: './concert.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConcertDumbComponent {
  readonly agendaConcerts = input.required<AgendaConcerts>();
}
