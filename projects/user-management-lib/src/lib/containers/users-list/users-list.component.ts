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
  modalOpen = false;
  selectedUser: User;
  users: User[];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.filter();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm() {
    this.filterForm = this.formBuilder.group({
      username: '',
      permissions: '',
    });
  }

  filter() {
    console.log(this.filterForm.getRawValue());
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
}
