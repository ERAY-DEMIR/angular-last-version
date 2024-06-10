import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    const { username, password } = this.loginForm.value;

    try {
      const response = await firstValueFrom(this.authService.login(username, password));
      if (response) {
        console.log('Login successful', response);
        this.authService.setAuthenticated(true, username);
        this.router.navigate(['/home']);
      } else {
        this.loginError = 'Invalid username or password';
      }
    } catch (error) {
      console.error('Login error', error);
      this.loginError = 'Invalid username or password';
    }
  }
}
