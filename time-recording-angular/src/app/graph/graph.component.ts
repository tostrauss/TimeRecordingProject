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
  graphMessage = '';
  chart: any;

  constructor(private timeRecordingService: TimeRecordingService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadUsers();
    this.loadGraphData();
  }

  // Add filterGraph method
  filterGraph(userId?: string) {
    const userFilter = userId || '';
    const dateFilter = (document.getElementById('date-filter') as HTMLInputElement)?.value || '';
    this.loadGraphData(dateFilter, userFilter);
  }

  // Load users from API
  loadUsers() {
    this.timeRecordingService.getUsers().subscribe(
      (users: any) => (this.users = users),
      (error) => console.error('Error loading users', error)
    );
  }

  // Load graph data
  loadGraphData(filterDate: string = '', filterUser: string = '') {
    this.timeRecordingService.getRecords().subscribe(
      (records: any[]) => {
        const filteredRecords = records.filter((record: any) => {
          return (!filterDate || record.date === filterDate) && (!filterUser || record.user_id === filterUser);
        });

        const labels = filteredRecords.map((record: any) => record.date);
        const data = filteredRecords.map((record: any) => record.hours_worked);

        if (this.chart) this.chart.destroy();
        const ctx = document.getElementById('hoursChart') as HTMLCanvasElement;
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: 'Hours Worked',
                data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
              }
            ]
          }
        });
      },
      (error) => {
        console.error('Error loading graph data', error);
        this.graphMessage = 'Failed to load graph data';
      }
    );
  }
}

