// driver-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../../../models/driver.model';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  [x: string]: any;
  // getDriverById(driverId: string) {
  //   throw new Error('Method not implemented.');
  // }
  private apiUrl = 'http://localhost:9090/api/driver'; // API endpoint URL

  constructor(private http: HttpClient) {}

  // Method to get the list of drivers from the backend
  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);
  }
 
  getDriverById(driverId: number): Observable<any> {
    return this.http.get<Driver>(`${this.apiUrl}/${driverId}`);
  }
updateDriver(formData: FormData): Observable<any> {
  return this.http.put(this.apiUrl, formData);
  }
 addDriver(formData: FormData): Observable<any> {
  return this.http.post(this.apiUrl, formData);
}

  deleteDriver(driverId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${driverId}`);
  }
  

  
}




