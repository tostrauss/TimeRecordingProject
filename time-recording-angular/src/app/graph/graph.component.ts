import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TimeRecordingService } from '../services/time-recording.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  users: any[] = [];
  graphMessage: string = '';
  chart: any;

  constructor(private timeRecordingService: TimeRecordingService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadUsers();
    this.loadGraphData();
  }

  loadUsers() {
    this.timeRecordingService.getUsers().subscribe(
      (users: any[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  filterGraph(filterType: string, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    if (!target) return;
  
    if (filterType === 'user') {
      const userId = target.value;
      const dateFilter = (document.getElementById('date-filter') as HTMLInputElement)?.value || '';
      this.loadGraphData(dateFilter, userId);
    } else if (filterType === 'date') {
      const dateFilter = target.value;
      const userId = (document.getElementById('user-filter') as HTMLSelectElement)?.value || '';
      this.loadGraphData(dateFilter, userId);
    }
  }
  

  loadGraphData(filterDate: string = '', filterUser: string = '') {
    this.timeRecordingService.getRecords().subscribe(
      (records: any[]) => {
        const filteredRecords = records.filter((record: any) => {
          return (!filterDate || record.date === filterDate) && (!filterUser || record.user_id === parseInt(filterUser));
        });

        const labels = filteredRecords.map(record => record.date);
        const data = filteredRecords.map(record => record.hours_worked);

        if (this.chart) {
          this.chart.destroy();
        }

        const ctx = document.getElementById('hoursChart') as HTMLCanvasElement;
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Hours Worked',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Hours Worked',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
            },
          },
        });
      },
      (error) => {
        console.error('Error loading records:', error);
        this.graphMessage = 'An error occurred while loading records.';
      }
    );
  }
}


