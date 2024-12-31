import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimeRecordingService {
  private apiUrl = environment.apiBaseUrl;  // <-- reference the environment

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true });
  }

  addRecord(record: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add_record`, record, { withCredentials: true });
  }
  
  getUsers(): Observable<{ id: number; username: string }[]> {
    return this.http.get<{ id: number; username: string }[]>(`${this.apiUrl}/get_users`);
  }

  getRecords(startDate: string, endDate: string, userId?: number)
    : Observable<{ date: string; hours_worked: number }[]> {
    const params: any = { start_date: startDate, end_date: endDate };
    if (userId) {
      params.user_id = userId;
    }
    return this.http.get<{ date: string; hours_worked: number }[]>(`${this.apiUrl}/get_records`, { params });
  }
}


