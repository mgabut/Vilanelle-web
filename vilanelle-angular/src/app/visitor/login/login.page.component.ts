import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRequestDto } from '../../dto/auth-request-dto';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { CommonModule } from '@angular/common';
import { NavbarSmartComponent } from '../../core/navbar/navbar.smart.component';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarSmartComponent],
  selector: 'app-login-page',
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.scss'
})
export class LoginPageComponent implements OnInit {
  protected loginError: boolean = false;
  protected userForm!: FormGroup;
  protected usernameCtrl!: FormControl;
  protected passwordCtrl!: FormControl;

    constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.usernameCtrl = this.formBuilder.control('', Validators.required);
    this.passwordCtrl = this.formBuilder.control('', [ Validators.required, Validators.minLength(4) ]);

    this.userForm = this.formBuilder.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl
    });
  }

  public async connecter() {
    try {
      // La méthode auth renvoyant une Promise, on peut attendre la résolution avec "await"
      await this.authService.auth(new AuthRequestDto(this.usernameCtrl.value, this.passwordCtrl.value));

      const token = sessionStorage.getItem('token');
      console.log(token)

      if (!token) {
        this.loginError = true;
        return;
      }

      // Décoder le token JWT
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Payload:", payload.role);

      if (payload.role==="ADMIN") {
        this.router.navigate(['/scores']);
        console.log("Admin connecté");
      } else {
        this.router.navigate(['/scores']);
        console.log("Utilisateur connecté");
    }
    }

    // Si la connexion n'a pas pu se faire, affichage de l'erreur sur le template
    catch {
      this.loginError = true;
    }
  }

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
