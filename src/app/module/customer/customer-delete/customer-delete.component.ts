import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer-service';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.scss']
})
export class CustomerDeleteComponent {

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');

    if (customerId) {
      this.customerService.deleteCustomer(+customerId).subscribe(
        () => {
          alert('Customer deleted successfully!');
          this.router.navigate(['/customers']); // Navigate back to customer list
        },
        (error) => {
          alert('Failed to delete customer!');
          console.error(error);
          this.router.navigate(['/customers']);
        }
      );
    } else {
      alert('Invalid Customer ID');
      this.router.navigate(['/customers']);
    }
  }
}