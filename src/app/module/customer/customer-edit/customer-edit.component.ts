import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer-service';
import { Customer, CustomerDetails } from '../../../models/customer.model';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  customerForm!: FormGroup;
  isSubmitted = false;
  customerId: string | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.customerId = params['id'];
      this.loadCustomerData(this.customerId);
    });

    this.customerForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  loadCustomerData(customerId: string | null): void {
    if (customerId) {
      this.customerService.getCustomerById(+customerId).subscribe(
        (customerData: any) => {
          this.customerForm.patchValue({
            id: customerData.id,
            name: customerData.name,
            contact: customerData.contact,
            email: customerData.email,
            address: customerData.address
          });
        },
        (error: any) => {
          console.error('Error loading customer data', error);
          this.errorMessage = 'Failed to load customer data';
        }
      );
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    const customerDetails = this.createFormData();
    this.subscribeToSaveResponse(this.customerService.updateCustomer(customerDetails));
  }

  createFormData(): Customer {
    return {
      ...new CustomerDetails(),
      id: this.customerForm.get(['id'])!.value,
      name: this.customerForm.get(['name'])!.value,
      contact: this.customerForm.get(['contact'])!.value,
      email: this.customerForm.get(['email'])!.value,
      address: this.customerForm.get(['address'])!.value,
    };
  }

  previousState(): void {
    window.history.back();
  }

  protected subscribeToSaveResponse(result: any): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    this.errorMessage = 'Failed to update customer';
  }
}