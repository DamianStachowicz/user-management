import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../dto/user.interface';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'lib-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  modalOpen = false;
  selectedUser: User;
  users: User[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.filter();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private filter() {
    this.usersService
      .getUsersList()
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
