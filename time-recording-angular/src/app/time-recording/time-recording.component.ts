import { Component } from '@angular/core';
import { TimeRecordingService } from '../services/time-recording.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-recording',
  templateUrl: './time-recording.component.html',
  styleUrls: ['./time-recording.component.css'],
})
export class TimeRecordingComponent {
  message = '';

  constructor(
    private timeRecordingService: TimeRecordingService,
    private router: Router
  ) {}

  addRecord(form: any): void {
    if (!form.valid) {
      this.message = 'Please fill out all fields.';
      return;
    }

    const record = form.value;
    this.timeRecordingService.addRecord(record).subscribe(
      (response) => {
        this.message = response.message;
        // Redirect to graph page after success
        setTimeout(() => {
          this.router.navigate(['/graph']);
        }, 1000); // Wait 1 second to show the success message
      },
      (error) => {
        console.error('Error adding record:', error);
        this.message = 'Failed to add record. Please try again.';
      }
    );
  }
}


