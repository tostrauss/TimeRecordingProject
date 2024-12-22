import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeRecordingService {
  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<any> {
    // Mock user credentials
    const mockUsers = [
      { username: 'tofu', password: 'xxx' }, // Example user
    ];
  
    const user = mockUsers.find(
      (u) => u.username === data.username && u.password === data.password
    );
  
    if (user) {
      return of({ message: 'Login successful', user });
    } else {
      return throwError(() => new Error('Invalid username or password'));
    }
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
