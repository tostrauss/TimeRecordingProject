import { Component } from '@angular/core';
import { TimeRecordingService } from '../services/time-recording.service';

@Component({
  selector: 'app-time-recording',
  templateUrl: './time-recording.component.html',
  styleUrls: ['./time-recording.component.css']
})
export class TimeRecordingComponent {
  isLoading = false;
  clockStatus = 'Clock In'; // Toggle status between Clock In and Clock Out
  clockMessage = ''; // To display clock-related messages
  messageColor = ''; // Dynamically set the color of messages
  recordMessage = ''; // To display record submission messages

  constructor(private timeRecordingService: TimeRecordingService) {}

  // Toggle Clock In/Clock Out functionality
  toggleClock() {
    this.isLoading = true;
    this.timeRecordingService.toggleClock(this.clockStatus).subscribe(
      (response: any) => {
        this.clockStatus = this.clockStatus === 'Clock In' ? 'Clock Out' : 'Clock In';
        this.clockMessage = response.message;
        this.messageColor = 'green';
      },
      (error: any) => {
        this.clockMessage = error.error?.message || 'An error occurred.';
        this.messageColor = 'red';
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  // Handle form submission
  onSubmit(form: any) {
    if (!form.valid) {
      this.recordMessage = 'Please fill out all fields correctly.';
      this.messageColor = 'red';
      return;
    }

    const { taskDetails, hoursWorked, date } = form.value; // Extract form values
    this.isLoading = true;
    this.timeRecordingService.addRecord({ taskDetails, hoursWorked, date }).subscribe(
      (response: any) => {
        this.recordMessage = 'Record added successfully!';
        this.messageColor = 'green';
        form.reset(); // Reset the form after successful submission
      },
      (error: any) => {
        this.recordMessage = error.error?.message || 'Failed to add record. Try again.';
        this.messageColor = 'red';
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
