import { Component, signal } from '@angular/core';
import { FeatureCardListDumbComponent } from './feature-card-list/feature-card-list.dumb.component';

@Component({
  imports: [FeatureCardListDumbComponent],
  selector: 'app-home-page',
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss'
})
export class HomePageComponent {

  featureCardList = signal([
    { 
      name: 'Feature 1',
      icon: "../icons/music-sheet.png", 
      description: 'RÉPERTOIRE ÉCLECTIQUE VARIÉ' 
    },
    { 
      name: 'Feature 2',
      icon: "../icons/man-woman.png", 
      description: 'CHORALE MIXTE' 
    },
    { 
      name: 'Feature 3',
      icon: "../icons/choir.png", 
      description: '40 CHORISTES' 
    }
  ]);

}
