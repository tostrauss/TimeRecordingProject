import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeRecordingService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post('/login', data, { withCredentials: true });
  }

  addRecord(record: any): Observable<any> {
    return this.http.post('/add_record', record, { withCredentials: true });
  }

  getRecords(): Observable<any> {
    return this.http.get('/get_records', { withCredentials: true });
  }

  toggleClock(currentStatus: string): Observable<any> {
    return this.http.post('/toggle_clock', { current_status: currentStatus }, { withCredentials: true });
  }

  getUsers(): Observable<any> {
    return this.http.get('/get_users', { withCredentials: true });
  }
}
