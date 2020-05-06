import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../dto/user.interface';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'lib-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  users$: Observable<User[]> = this.usersService.getUsersList();

  constructor(private usersService: UsersService) { }
}
