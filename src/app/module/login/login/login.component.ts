import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user/user-list/user-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
testClick() {
alert("Button clicked!");
}
loginWithGoogle() {
  console.log("Google login clicked");
}
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

 onSubmit() {debugger;
  if (this.loginForm.invalid) return;

  const { username, password } = this.loginForm.value;

  this.userService.login(username, password).subscribe((res:any) =>{
    
    // const data = res;
   if(res.message == 'SUCCESS'){
    localStorage.setItem('isLoggedIn', 'true'); 
     this.router.navigate(['/users']);
   }
   else{
this.errorMessage = 'Invalid username or password';
   }
   
  });
}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
