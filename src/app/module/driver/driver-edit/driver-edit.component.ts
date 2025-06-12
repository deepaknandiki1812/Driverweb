import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../driver-list/driver-service';
import { Driver, DriverDetails } from '../../../models/driver.model';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.scss']
})
export class DriverEditComponent implements OnInit {
  driverForm!: FormGroup;
  isSubmitted = false;
  driverId: string | null = null;

  selectedImageFile: File | null = null;
  selectedLicenceFile: File | null = null;
imagePreview: any;
  formData: any;
licenceUrl: string = '';
imageUrl: string='';


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private driverService: DriverService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.driverForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      joindate: ['', Validators.required],
      vehicletype: ['', Validators.required],
      status: [null, Validators.required],
     licence: ['']
    });

    this.route.queryParams.subscribe(params => {
      this.driverId = params['id'];
      if (this.driverId) {
        this.loadDriverData(this.driverId);
      }
    });
  }

loadDriverData(driverId: string): void {debugger;
  this.driverService.getDriverById(+driverId).subscribe(driverData => {
    console.log(driverData);
    this.driverForm.patchValue({
      id: driverData.id,
      name: driverData.name,
      vehicleNumber: driverData.vehicleNumber,
      email: driverData.email,
      address: driverData.address,
      joindate: driverData.joindate ? driverData.joindate.substring(0, 10) : null,
      vehicletype: driverData.vehicletype,
     
      status: driverData.status,
       licence: driverData.licence || ''
      
    });
if (driverData.licence) {
  this.licenceUrl = `http://localhost:9090/uploads/licence/${driverData.licence}`;
} 

if (driverData.image) {
  this.imageUrl = `http://localhost:9090/uploads/image/${driverData.image}`;
}

  //  if (driverData.image) {
  //     this.imagePreview = `http://yourserver.com/uploads/images/${driverData.image}`;
  //   }
  //    if (driverData.licence) {
  //     this.licenceUrl = `uploads\e34f07ab-86f7-4ceb-aa2a-cdf64eae991f_pulsar.pdf/${driverData.licence}`;
  //   }
    this.imagePreview = driverData.image;
    this.driverForm.get('licence')?.setValue(null);
  });





      // Optionally set previews or handle existing images if needed
    
  }

onImageSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.selectedImageFile = file;
    this.driverForm.patchValue({ image: file });
    this.driverForm.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

onLicenceSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.selectedLicenceFile = file;
    this.driverForm.patchValue({ licence: file });
    this.driverForm.get('licence')?.updateValueAndValidity();
  }
}

onSubmit():void {debugger;
   const DriverDetails = this.createFormData();
  
this.formData.append('driver', JSON.stringify(DriverDetails));
       this.subscribeToSaveResponse(this.driverService.updateDriver(this.formData));
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
    id: this.driverForm.get('id')!.value,
    name: this.driverForm.get('name')!.value,
    email: this.driverForm.get('email')!.value,
    address: this.driverForm.get('address')!.value,
    vehicleNumber: this.driverForm.get('vehicleNumber')!.value,
    joindate: this.driverForm.get('joindate')!.value,
    vehicletype: this.driverForm.get('vehicletype')!.value,
    status: this.driverForm.get('status')!.value,
  };

  this.formData = new FormData();
  
  if (this.selectedImageFile) {
    this.formData.append('image', this.selectedImageFile); // 👈 make sure not null
  }
  if (this.selectedLicenceFile) {
    this.formData.append('licence', this.selectedLicenceFile); // 👈 make sure not null
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
