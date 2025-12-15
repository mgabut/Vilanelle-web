import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterSmartComponent } from './core/footer/footer.smart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterSmartComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('vilanelle-angular');
}
