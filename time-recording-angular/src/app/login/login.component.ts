import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TimeRecordingService } from '../services/time-recording.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false; // To manage loading state
  loginMessage = ''; // To display success or error messages
  messageColor = ''; // To dynamically set message color

  constructor(private timeRecordingService: TimeRecordingService, private router: Router) {}

  onSubmit(form: any) {
    if (!form.valid) {
      this.loginMessage = 'Please fill out all fields correctly.';
      this.messageColor = 'red';
      return;
    }

    this.isLoading = true;
    const {username, password} = form.value;

    this.timeRecordingService.login({username, password}).subscribe(
      (response: any) => {
        this.loginMessage = response.message || 'Login successful!';
        this.messageColor = 'green';
        setTimeout(() => this.router.navigate(['/time-recording']), 1000);
      },
      (error: any) => {
        this.loginMessage = error.message || 'Invalid username or password.'
        this.messageColor = 'red';
        this.isLoading = false;
      },
    );
  }
}
