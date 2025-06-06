import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
isLoggedIn: any;
  
  ngOnInit(): void {
    alert("TEST-LOADING")
  }
  title = 'Driver Management App';

}
