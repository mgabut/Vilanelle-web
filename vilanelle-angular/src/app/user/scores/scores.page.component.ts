import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavadminSmartComponent } from "../../core/navadmin/navadmin.smart.component";


@Component({
  imports: [CommonModule, NavadminSmartComponent],
  templateUrl: './scores.page.component.html',
  styleUrl: './scores.page.component.scss',
  selector: 'app-scores-page'
})


export class ScoresPageComponent {

}
