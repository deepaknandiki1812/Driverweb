import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../driver-list/driver-service';
import { Driver, DriverDetails } from '../../../models/driver.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.scss']
})
export class DriverEditComponent  {
 
  driverForm!: FormGroup;
  isSubmitted = false;
  driverId: string | null = null;
  errorMessage: string= '';
  successMessage: string='';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, // Inject ActivatedRoute to read query params
    private driverService: DriverService, // Assuming you have a service to fetch driver data
    private router: Router // Router to navigate after update
  ) {}

  ngOnInit(): void {
    // Get the 'id' query parameter from the URL
    this.route.queryParams.subscribe(params => {
      this.driverId = params['id']; // Extract the driver id
      console.log('Editing Driver with ID:', this.driverId);
      
       // Fetch driver data using the driver ID
       this.loadDriverData(this.driverId);
    });

    // Initialize form
    this.driverForm = this.fb.group({
      id: [''], 
      name: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      joindate: ['', Validators.required],
      vehicletype: ['', Validators.required],
      status: [null, Validators.required]

    });
  }
loadDriverData(driverId: string | null): void {
  if (driverId) {
    this.driverService.getDriverById(+driverId).subscribe(
      (driverData: any) => {
        // ✅ Add this line here to debug response
        console.log("API Response from backend:", driverData);

        // Patch form values
        this.driverForm.patchValue({
          id: driverData.id,
          name: driverData.name,
          vehicleNumber: driverData.vehicleNumber,
          email: driverData.email,
          address: driverData.address,
          joindate: driverData.joindate ? driverData.joindate.substring(0, 10) : null,
          vehicletype: driverData.vehicletype,
          status: driverData.status,
        });
      },
      (error: any) => {
        console.error('Error loading driver data', error);
      }
    );
  }
}



  // Handle form submission
  onSubmit(): void {
    this.isSubmitted = true;
     const driverdetails = this.createFormForm();
      this.subscribeToSaveResponse(this.driverService.updateDriver(driverdetails));
    // if (this.driverForm.valid) {
    //   // Call the service to update the driver
    //   this.driverService.updateDriver(this.driverForm.value).subscribe(
    //     (response) => {
    //       console.log('Driver updated successfully:', response);
    //       this.successMessage = 'Driver updated successfully!';
    //       this.errorMessage = '';  // Clear any previous error messages
    //       this.router.navigate(['/drivers']); // Navigate back to the driver list
    //     },
    //     (error) => {
    //       console.error('Error updating driver:', error);
    //       this.successMessage = '';  // Clear any previous success messages
    //       this.errorMessage = 'There was an error loading the driver data.';
    //     }
    //   );
    // } else {
    //   console.warn('Form is invalid');
    //   this.errorMessage = 'Please fill in all required fields.';
    // }
    console.log("Submitting Driver:", this.driverForm.value);


  }
   createFormForm():Driver {
      return{
      ...new DriverDetails(),
      id: this.driverForm.get(["id"])!.value,
      name: this.driverForm.get(["name"])!.value,
      email: this.driverForm.get(["email"])!.value,
      address: this.driverForm.get(["address"])!.value,
      vehicleNumber: this.driverForm.get(["vehicleNumber"])!.value,
      joindate:this.driverForm.get(["joindate"])!.value,
      vehicletype:this.driverForm.get(["vehicletype"])!.value,
      status: this.driverForm.get('status')!.value 
    }
    }

    previousState(): void {
    window.history.back();
  }

  protected subscribeToSaveResponse(
    result: any
  ): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    // this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    // this.isSaving = false;
  }
  }

