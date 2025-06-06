import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../driver-list/driver-service';

@Component({
  selector: 'app-driver-delete',
  templateUrl: './driver-delete.component.html',
  styleUrls: ['./driver-delete.component.scss']
})
export class DriverDeleteComponent {
  
  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Step 1: Get driver ID from route params
    const driverId = this.route.snapshot.paramMap.get('id');

    if (driverId) {
      // Step 2: Call delete API
      this.driverService.deleteDriver(+driverId).subscribe(
        (response) => {
          alert('Driver deleted successfully!');
          this.router.navigate(['/drivers']); // Navigate back to driver list
        },
        (error) => {
          alert('Failed to delete driver!');
          console.error(error);
          this.router.navigate(['/drivers']);
        }
      );
    } else {
      alert('Invalid Driver ID');
      this.router.navigate(['/drivers']);
    }
  }

}
