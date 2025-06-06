import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer-service';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  page: number = 1;
  searchText: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {debugger;
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
        this.filteredCustomers = data;
      },
      (error) => {
        console.error('Error loading customers:', error);
      }
    );
  }

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase().trim();
    if (filterValue) {
      this.filteredCustomers = this.customers.filter(customer =>
        (customer.name && customer.name.toLowerCase().includes(filterValue)) ||
        (customer.email && customer.email.toLowerCase().includes(filterValue)) ||
        (customer.address && customer.address.toLowerCase().includes(filterValue)) ||
        (customer.contact && customer.contact.includes(filterValue))
      );
    } else {
      this.filteredCustomers = this.customers;
    }
  }

  deleteCustomer(customerId: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      this.customerService.deleteCustomer(customerId).subscribe(
        () => {
          alert('Customer deleted successfully!');
          this.loadCustomers();
        },
        (error: any) => {
          console.error('Error deleting customer:', error);
          alert('Failed to delete customer.');
        }
      );
    }
  }
}