import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DriverService } from '../driver-list/driver-service';
import { Driver, DriverDetails } from '../../../models/driver.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-driver-create',
  templateUrl: './driver-create.component.html',
  styleUrls: ['./driver-create.component.scss']
})
export class DriverCreateComponent implements OnInit {
 driverForm!: FormGroup;

  selectedImage: File | null = null;
  selectedLicence: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
 
selectedFile: any;
fileInput: any;
formData: any;

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      joindate: ['', Validators.required],
      vehicletype: ['', Validators.required],
      status: [null, Validators.required],
      image: [null, Validators.required],
      licence: [null, Validators.required]
    });
  }

  onImageSelected(event: Event): void {debugger;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onLicenceSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedLicence = input.files[0];
    }
  }
// Component example
onSubmit():void {debugger;
   const DriverDetails = this.createFormData();
   this.formData.append('driver', JSON.stringify(DriverDetails));
       this.subscribeToSaveResponse(this.driverService.addDriver(this.formData));
 if (this.driverForm.valid) {
      //  const DriverDetails = this.createFormData();
      //  this.subscribeToSaveResponse(this.driverService.addDriver(DriverDetails));
     } else {
       this.driverForm.markAllAsTouched();
     }
}
   

 
createFormData(): Driver {debugger;
  const driverDto: Driver = {
    ...new DriverDetails(),
    name: this.driverForm.get('name')!.value,
    email: this.driverForm.get('email')!.value,
    address: this.driverForm.get('address')!.value,
    vehicleNumber: this.driverForm.get('vehicleNumber')!.value,
    joindate: this.driverForm.get('joindate')!.value,
    vehicletype: this.driverForm.get('vehicletype')!.value,
    status: this.driverForm.get('status')!.value,
  };

  this.formData = new FormData();
  
  if (this.selectedImage) {
    this.formData.append('image', this.selectedImage); // 👈 make sure not null
  }
  if (this.selectedLicence) {
    this.formData.append('licence', this.selectedLicence); // 👈 make sure not null
  }

  return driverDto;
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
