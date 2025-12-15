import { Component, signal } from '@angular/core';
import { FeatureCardListDumbComponent } from './feature-card-list/feature-card-list.dumb.component';
import { NavbarSmartComponent } from '../../core/navbar/navbar.smart.component';

@Component({
  imports: [FeatureCardListDumbComponent, NavbarSmartComponent],
  selector: 'app-home-page',
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss'
})
export class HomePageComponent {

  featureCardList = signal([
    { 
      name: 'Feature 1',
      icon: "assets/icons/music-sheet.png", 
      description: 'RÉPERTOIRE ÉCLECTIQUE VARIÉ' 
    },
    { 
      name: 'Feature 2',
      icon: "assets/icons/man-woman.png", 
      description: 'CHORALE MIXTE' 
    },
    { 
      name: 'Feature 3',
      icon: "assets/icons/choir.png", 
      description: '40 CHORISTES' 
    }
  ]);

}
