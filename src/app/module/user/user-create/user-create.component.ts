import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User, UserDetails } from '../../../models/user.model';
import { UserService } from '../user-list/user-service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [0, Validators.required],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {debugger;
    if (this.userForm.valid) {
      const userDetails = this.createFormData();
      this.subscribeToSaveResponse(this.userService.addUser(userDetails));
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  createFormData(): User {
    return {
      ...new UserDetails(),
      id: this.userForm.get('id')!.value,
      username: this.userForm.get('userName')!.value,
      firstname: this.userForm.get('firstName')!.value,
      lastname: this.userForm.get('lastName')!.value,
      email: this.userForm.get('email')!.value,
      address: this.userForm.get('address')!.value,
      contact: this.userForm.get('contact')!.value,
      password: this.userForm.get('password')!.value
    };
  }

  protected subscribeToSaveResponse(result: any): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    alert('User info submitted successfully!');
    this.previousState();
  }

  protected onSaveError(): void {
    alert('Failed to submit user info.');
  }

  previousState(): void {
    window.history.back();
  }
}