import { Component } from '@angular/core';
import { MapDumbComponent } from './map/map.dumb.component';
import { NavbarSmartComponent } from '../../core/navbar/navbar.smart.component';

@Component({
  imports: [MapDumbComponent, NavbarSmartComponent],
  selector: 'app-joining-page',
  templateUrl: './joining.page.component.html',
  styleUrl: './joining.page.component.scss'
})
export class JoiningPageComponent {

}
