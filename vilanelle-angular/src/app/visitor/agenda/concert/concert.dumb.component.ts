import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AgendaConcerts } from './concert.interface';

@Component({
  selector: 'app-concert',
  imports: [],
  templateUrl: './concert.dumb.component.html',
  styleUrl: './concert.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConcertDumbComponent {
  readonly agendaConcerts = input.required<AgendaConcerts>();
}
