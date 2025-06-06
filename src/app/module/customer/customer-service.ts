import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 

    private apiUrl = 'http://localhost:9090/api/customer'; // Mee backend URL

  constructor(private http: HttpClient) {}
  getCustomerById(customerId: number): Observable<Customer> {
  return this.http.get<Customer>(`${this.apiUrl}/${customerId}`);
}
 
   addCustomer(customerData: Customer): Observable<Customer> {
      return this.http.post<Customer>(this.apiUrl, customerData);
    }
  getCustomers(): Observable<Customer[]> {
     return this.http.get<Customer[]>(this.apiUrl);
   }
   deleteCustomer(customerId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${customerId}`);
}
 updateCustomer(customerData: Customer): Observable<Customer> {
   return this.http.put<Customer>(this.apiUrl, customerData);
   }
}
