import { Component } from '@angular/core';
import { SectionPresentationDumbComponent } from './section-presentation/section-presentation.dumb.component';
import { NavbarSmartComponent } from '../../core/navbar/navbar.smart.component';

@Component({
  imports: [SectionPresentationDumbComponent, NavbarSmartComponent],
  templateUrl: './about.page.component.html',
  styleUrl: './about.page.component.scss'
})
export class AboutPageComponent {

}