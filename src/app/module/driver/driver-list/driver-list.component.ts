import { Component } from '@angular/core';
import { DriverService } from './driver-service';
import { Driver } from '../../../models/driver.model';




@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent {
  router: any;
triggerFileInput(_t35: HTMLInputElement) {
throw new Error('Method not implemented.');
}
uploadPhoto(arg0: number|undefined,arg1: FileList|null) {
throw new Error('Method not implemented.');
}
// applyFilter() {
// throw new Error('Method not implemented.');
// }
//   deletedriver(arg0: any) {
// throw new Error('Method not implemented.');
// }

  drivers: Driver[] = [];
  filteredDrivers: Driver[] = []; // Holds filtered list based on search
  page: number = 1;
  searchText: string = '';
  
  
  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.driverService.getDrivers().subscribe((data: Driver[]) => {
      this.drivers = data;
      this.filteredDrivers = data; // Initialize filtered list
      console.log('Drivers:', this.drivers);
    });
  }
    // Filters drivers based on searchText
  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase().trim();
    if (filterValue) {
     this.filteredDrivers = this.drivers.filter(driver =>
  (driver.name && driver.name.toLowerCase().includes(filterValue)) ||
  (driver.vehicleNumber && driver.vehicleNumber.toLowerCase().includes(filterValue)) ||
   (driver.address && driver.address.toLowerCase().includes(filterValue))||
   (driver.email && driver.email.toLowerCase().includes(filterValue))
);
    } else {
      this.filteredDrivers = this.drivers; // Reset filter if search is empty
    }
  }
  deleteDriver(driverId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this driver?');
  
    if (confirmDelete) {
      this.driverService.deleteDriver(driverId).subscribe(
        () => {
          alert('Driver deleted successfully!');
          this.ngOnInit(); // Refresh list after delete
        },
        (error) => {
          console.error('Error deleting driver:', error);
          alert('Failed to delete driver.');
        }
      );
    }
  }
  // fetchDrivers() {
  //   throw new Error('Method not implemented.');
  // }
  //    logout() {
  //   // Clear login state (e.g. token)
  //   localStorage.removeItem('token');
  //   // Redirect to login page
  //   this.router.navigate(['/login']);
  // }
}
  

