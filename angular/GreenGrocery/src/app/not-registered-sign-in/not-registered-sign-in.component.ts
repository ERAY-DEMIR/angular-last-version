import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { TestimonialCommentService } from '../testimonial-comment.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterService } from '../register.service';  // Import RegisterService
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-not-registered-sign-in',
  templateUrl: './not-registered-sign-in.component.html',
  styleUrls: ['./not-registered-sign-in.component.css']
})
export class NotRegisteredSignInComponent implements OnInit {
  registerForm: FormGroup;
  testimonialForm: FormGroup;
  isAuthenticated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private testimonialCommentService: TestimonialCommentService,
    private authService: AuthService,
    private registerService: RegisterService,  // Declare RegisterService
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.testimonialForm = this.formBuilder.group({
      comment: ['', Validators.required],
      rating: [null, Validators.required]
    });
  }

  ngOnInit() {
    // Initially check if the user is authenticated
    this.isAuthenticated = this.authService.isAuthenticated;

    // Subscribe to authentication changes
    this.authService.authenticationChanged.subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      try {
        const response = await firstValueFrom(this.registerService.register(user));
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Registration error', error);
      }
    }
  }

  onSubmitTestimonial() {
    // If user is already authenticated, redirect to dashboard or profile
    if (this.isAuthenticated) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard or profile page
      return;
    }

    if (this.testimonialForm.valid) {
      const testimonial = { ...this.testimonialForm.value, username: this.registerForm.value.username };
      this.testimonialCommentService.addTestimonial(testimonial).subscribe(() => {
        alert('Thank you for your testimonial!');
      });
    }
  }

  changeRating(rating: number) {
    this.testimonialForm.controls['rating'].setValue(rating);
  }
}