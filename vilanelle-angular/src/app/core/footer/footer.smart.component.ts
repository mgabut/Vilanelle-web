import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.smart.component.html',
  styleUrl: './footer.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterSmartComponent {

}
