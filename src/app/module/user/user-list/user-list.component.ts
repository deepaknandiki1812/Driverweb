import { Component, OnInit } from '@angular/core';

import { User } from '../../../models/user.model';
import { UserService } from './user-service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
newUser: any;
addUser() {
throw new Error('Method not implemented.');
}
  users: User[] = [];
  filteredUsers: User[] = [];
  page: number = 1;
  searchText: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {debugger;
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.filteredUsers = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  applyFilter(): void {debugger;
    const filterValue = this.searchText.toLowerCase().trim();
    if (filterValue) {
      this.filteredUsers = this.users.filter(user =>
         (user.firstname && user.firstname.toLowerCase().includes(filterValue))||
         (user.lastname && user.lastname.toLowerCase().includes(filterValue))||
         (user.username && user.username.toLowerCase().includes(filterValue))||
        (user.address && user.address.toLowerCase().includes(filterValue))||
        (user.email && user.email.toLowerCase().includes(filterValue)) ||
        (user.address && user.address.toLowerCase().includes(filterValue)) ||
        (user.contact && user.contact.toLowerCase().includes(filterValue)||
        (user.password && user.password.toLowerCase().includes(filterValue))
        
      ));
    } else {
      this.filteredUsers = this.users;
    }
  }

  deleteUser(userId: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          alert('User deleted successfully!');
          this.loadUsers();
        },
        (error: any) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user.');
        }
      );
    }
  }
}