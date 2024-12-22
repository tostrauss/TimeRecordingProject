import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeRecordingService {
  private apiUrl = 'http://127.0.0.1:5000'; // Flask backend URL

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    // Mock implementation for login
    const mockUsers = [{ username: 'tofu', password: 'xxx' }];
    const user = mockUsers.find(
      (u) => u.username === data.username && u.password === data.password
    );
    return user
      ? of({ message: 'Login successful', user })
      : of({ error: 'Invalid username or password' });
  }


  toggleClock(status: string): Observable<any> {
    // Placeholder for clock toggle logic
    console.log('Clock status toggled:', status);
    return of({ message: 'Clock status updated successfully' });
  }

  getUsers(): Observable<{ id: number; username: string }[]> {
    // Mock user data
    return of([
      { id: 1, username: 'User 1' },
      { id: 2, username: 'User 2' },
      { id: 3, username: 'User 3' },
    ]);
  }

  getRecords(startDate: string, endDate: string, userId?: number): Observable<any[]> {
    // Fetch records from the Flask backend
    const params: any = { start_date: startDate, end_date: endDate };
    if (userId) params.user_id = userId;

    return this.http.get<any[]>(`${this.apiUrl}/get_records`, { params });
  }

  addRecord(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:5000/add_record', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
}