import { Component, Inject, OnInit } from '@angular/core';
import { TimeRecordingService } from '../services/time-recording.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  users: { id: number; username: string }[] = [];
  startDate: string = '';
  endDate: string = '';
  selectedUser: number | null = null;
  graphMessage = '';
  chart: Chart | null = null;

  constructor(@Inject(TimeRecordingService) private timeRecordingService: TimeRecordingService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initializeDates();
    this.loadUsers();
    this.loadDefaultGraph();
  }

  initializeDates(): void {
    const today = new Date();
    this.startDate = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];
    this.endDate = new Date().toISOString().split('T')[0];
  }

  loadUsers(): void {
    this.timeRecordingService.getUsers().subscribe(
      (users) => {
        this.users = users;
        console.log('Users loaded:', users);
      },
      (error) => {
        console.error('Error loading users:', error);
        this.graphMessage = 'Failed to load user data. Please try again.';
      }
    );
  }

  loadDefaultGraph(): void {
    this.updateGraph();
  }

  updateGraph(): void {
    // Log the filters being used
    console.log('Fetching graph data for:', {
      startDate: this.startDate,
      endDate: this.endDate,
      selectedUser: this.selectedUser,
    });

    this.timeRecordingService
      .getRecords(this.startDate, this.endDate, this.selectedUser || undefined)
      .subscribe(
        (records) => {
          console.log('Records fetched:', records);

          if (records.length === 0) {
            this.graphMessage = 'No data available for the selected filters.';
            return;
          }

          const labels = records.map((record) => record.date);
          const data = records.map((record) => record.hours_worked);

          if (this.chart) {
            this.chart.destroy();
          }

          const ctx = document.getElementById('hoursChart') as HTMLCanvasElement;
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Hours Worked on Date',
                  data: data,
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });

          this.graphMessage = ''; // Clear any previous messages
        },
        (error) => {
          console.error('Error fetching graph data:', error);
          this.graphMessage = 'Failed to load graph data. Please try again.';
        }
      );
  }

  applyFilters(): void {
    if (new Date(this.startDate) > new Date(this.endDate)) {
      this.graphMessage = 'Start date must be before end date.';
      console.error('Invalid date range:', this.startDate, this.endDate);
      return;
    }
    this.updateGraph();
  }
}
