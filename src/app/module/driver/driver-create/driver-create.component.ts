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
      isActive: [null, Validators.required],
      image: [null, Validators.required],
      licence: [null, Validators.required]
    });
  }

  onImageSelected(event: Event): void {
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

  onSubmit(): void {debugger;
    if (this.driverForm.invalid) {
      alert('Please fill out all required fields');
      return;
    }

    const formData = new FormData();

    // Append text fields
    Object.keys(this.driverForm.controls).forEach(key => {
      if (key !== 'image' && key !== 'licence') {
        formData.append(key, this.driverForm.get(key)?.value);
      }
    });

    // Append files
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    } else {
      alert('Please select an image');
      return;
    }

    if (this.selectedLicence) {
      formData.append('licence', this.selectedLicence, this.selectedLicence.name);
    } else {
      alert('Please select a licence file');
      return;
    }

    // Send to backend
    this.driverService.addDriver(formData).subscribe({
      next: (res) => {
        console.log('Driver added successfully:', res);
        // Optionally reset the form here
        this.driverForm.reset();
        this.selectedImage = null;
        this.selectedLicence = null;
        this.imagePreview = null;
      },
      error: (err) => {
        console.error('Error adding driver:', err);
      }
    });
  }
}
  // previousState(): void {
  //   window.history.back();
  // }

  // protected subscribeToSaveResponse(
  //   result: any
  // ): void {
  //   result.subscribe(
  //     () => this.onSaveSuccess(),
  //     () => this.onSaveError()
  //   );
  // }

  // protected onSaveSuccess(): void {
  //   // this.isSaving = false;
  //   this.previousState();
  // }

  // protected onSaveError(): void {
  //   // this.isSaving = false;
  // }


