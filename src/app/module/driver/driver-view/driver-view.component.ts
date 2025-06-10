import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverService } from '../driver-list/driver-service';

@Component({
  selector: 'app-driver-view',
  templateUrl: './driver-view.component.html',
  styleUrls: ['./driver-view.component.scss']
})
export class DriverViewComponent {
downloadDriverDetails() {
  const content = document.querySelector('.driver-details-table')?.outerHTML;
  if (!content) {
    alert('Driver details not available to download.');
    return;
  }

  const html = `
    <html>
      <head>
        <title>Driver Details</title>
        <style>
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>Driver Details</h2>
        ${content}
      </body>
    </html>
  `;

  const blob = new Blob([html], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `driver-details-${this.driver?.id || 'unknown'}.html`;
  a.click();
  window.URL.revokeObjectURL(url);

}
    driverId: string | null = null;
  driver: any;

  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService
  ) {}

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.driverId = params['id'];
    if (this.driverId) {
      const id = Number(this.driverId); // 🔧 convert string to number
      this.driverService.getDriverById(id).subscribe(data => {
        this.driver = data;
        console.log('Driver details:', this.driver);
        
      });
      
    }
  });
}
}
