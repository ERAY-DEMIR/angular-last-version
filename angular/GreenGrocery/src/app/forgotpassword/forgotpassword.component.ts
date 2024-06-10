import { Component } from '@angular/core';
import { ForgotPasswordService } from '../forgotpassword.service';
import { ForgotYourPassword } from '../forgotpassword.model';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent {

  forgotPasswordDetails: ForgotYourPassword = {
    email: ''
  };
  message: string = '';

  constructor(private forgotPasswordService: ForgotPasswordService) { }

  onSubmit() {
    this.forgotPasswordService.requestPasswordReset(this.forgotPasswordDetails.email).subscribe(
      response => {
        this.message = response;
        console.log(response);
        alert('Password reset link sent to your email.');
      },
      
    );
  }
}