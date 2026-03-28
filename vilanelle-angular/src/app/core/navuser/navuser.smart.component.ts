import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navuser',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './navuser.smart.component.html',
  styleUrl: './navuser.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavuserSmartComponent {

  constructor(public authService: AuthService, private router: Router) { }
  
  deconnexion():void { 
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
