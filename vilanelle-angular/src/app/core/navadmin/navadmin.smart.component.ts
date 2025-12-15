import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-navadmin',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './navadmin.smart.component.html',
  styleUrl: './navadmin.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavadminSmartComponent {

  constructor(private authService: AuthService, private router: Router) { }
  
  deconnexion():void { 
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
