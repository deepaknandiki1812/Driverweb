import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {
 updateUser(userId: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, userId);
    }
  getUserById(userId: number): Observable<User> {
   return this.http.get<User>(`${this.apiUrl}/${userId}`);
 }


     private apiUrl = 'http://localhost:9090/api/user'; // Mee backend URL
    
      constructor(private http: HttpClient) {}
 deleteUser(userId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${userId}`); // మీ API URL ప్రకారం మార్చుకోండి
}
getUsers(): Observable<User[]> {
     return this.http.get<User[]>(this.apiUrl);
   }
     addUser(userData: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, userData);
      }
       login(username: string, password: string): Observable<any> {debugger;
    return this.http.get(this.apiUrl+'/login'+'/'+username+'/'+password);
  }

}