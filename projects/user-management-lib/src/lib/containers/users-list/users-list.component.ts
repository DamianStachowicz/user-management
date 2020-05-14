import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'lib-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  filterForm: FormGroup;
  addForm: FormGroup;
  modalOpen = false;
  selectedUser: User;
  users: User[];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {
    this.createFilterForm();
    this.createAddForm();
  }

  ngOnInit() {
    this.filter();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createFilterForm() {
    this.filterForm = this.formBuilder.group({
      username: '',
      permissions: '',
    });
  }

  private createAddForm() {
    this.addForm = this.formBuilder.group({
      username: '',
      permissions: '',
    });
  }

  filter() {
    this.usersService
      .getUsersList(this.filterForm.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => (this.users = users));
  }

  openDeleteModal(user: User) {
    this.modalOpen = true;
    this.selectedUser = user;
  }

  deleteUser(id: string) {
    this.usersService.deleteUser(id).subscribe();
    this.modalOpen = false;
    this.filter();
  }

  addUser() {
    const rawValue = this.addForm.getRawValue();
    const user: User = {
      id: null,
      name: rawValue.username,
      permissions: rawValue.permissions.replace(/\s/, '').split(','),
    };
    this.addForm.reset({ username: '', permissions: '' });
    this.usersService.createUser(user).subscribe(() => this.filter());
  }
}
