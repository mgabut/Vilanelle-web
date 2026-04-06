import { Component, signal } from '@angular/core';
import { SectionPresentationDumbComponent } from './section-presentation/section-presentation.dumb.component';
import { NavbarSmartComponent } from '../../core/navbar/navbar.smart.component';
import { FeatureCardListDumbComponent } from './feature-card-list/feature-card-list.dumb.component';

@Component({
  imports: [SectionPresentationDumbComponent, NavbarSmartComponent, FeatureCardListDumbComponent],
  templateUrl: './about.page.component.html',
  styleUrl: './about.page.component.scss'
})
export class AboutPageComponent {

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