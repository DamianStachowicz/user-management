import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../dto/user.interface';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'lib-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  user$: Observable<User>;
  userId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.userId = this.activatedRoute.snapshot.params.id;
    this.user$ = this.usersService.getUser(this.userId);
  }
}
