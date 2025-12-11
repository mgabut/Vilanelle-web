import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserStore } from '../../core/store/user.store';
import { AuthenticationService } from '../../core/authentication.service';
import { Visitor } from '../../core/entity/user.interface';


@Component({
  imports: [FormsModule],
  templateUrl: './register.page.component.html',
  styleUrl: './register.page.component.scss',
  selector: 'app-register-page',
})

export class RegisterPageComponent {
 
  readonly store = inject(UserStore);
  readonly authenticationService = inject(AuthenticationService);

  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');

  readonly isPasswordMatchValid = computed(() => 
    this.password() === this.confirmPassword()
  )

  onSubmit() {
    console.log('Form submitted');
    const visitor: Visitor = {
      name: this.name(),
      email: this.email(),
      password: this.password(),
    };
    this.store.register(visitor);
  }

}
