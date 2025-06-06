import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserDetails } from '../../../models/user.model';
import { UserService } from '../user-list/user-service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitted = false;
  userId: string | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {debugger;
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.loadUserData(this.userId);
    });

    this.userForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      password:['',Validators.required],
    });
  }

  loadUserData(userId: string | null): void {
    if (userId) {
      this.userService.getUserById(+userId).subscribe(
        (userData: any) => {
          this.userForm.patchValue({
            id: userData.id,
            username: userData.username,
            contact: userData.contact,
            email: userData.email,
            address: userData.address,
            firstname:userData.firstname,
            lastname:userData.lastname,
            password:userData.password
          });
        },
        (error: any) => {
          console.error('Error loading user data', error);
          this.errorMessage = 'Failed to load user data';
        }
      );
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    const userDetails = this.createFormData();
    this.subscribeToSaveResponse(this.userService.updateUser(userDetails));
  }

  createFormData(): User {
    return {
      ...new UserDetails(),
      id: this.userForm.get(['id'])!.value,
      username: this.userForm.get(['username'])!.value,
      contact: this.userForm.get(['contact'])!.value,
      email: this.userForm.get(['email'])!.value,
      address: this.userForm.get(['address'])!.value,
      firstname: this.userForm.get(['firstname'])!.value,
      lastname: this.userForm.get(['lastname'])!.value,
      password: this.userForm.get(['password'])!.value,
    };
  }

  previousState(): void {
    window.history.back();
  }

  protected subscribeToSaveResponse(result: any): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    this.errorMessage = 'Failed to update user';
  }
}