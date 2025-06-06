import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer-service';
import { Customer, CustomerDetails } from '../../../models/customer.model';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }

  onSubmit(): void {debugger;
    if (this.customerForm.valid) {
      const customerDetails = this.createFormData();
      this.subscribeToSaveResponse(this.customerService.addCustomer(customerDetails));
    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  createFormData(): Customer {
    return {
      ...new CustomerDetails(),
      id: this.customerForm.get(['id'])!.value,
      name: this.customerForm.get(['name'])!.value,
      email: this.customerForm.get(['email'])!.value,
      address: this.customerForm.get(['address'])!.value,
      contact: this.customerForm.get(['contact'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: any): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    alert('Customer info submitted successfully!');
    this.previousState();
  }

  protected onSaveError(): void {
    alert('Failed to submit customer info.');
  }

  previousState(): void {
    window.history.back();
  }
}