import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UtilsLibModule } from 'utils-lib';
import { UserEditComponent } from './containers/user-edit/user-edit.component';
import { UsersListComponent } from './containers/users-list/users-list.component';

const routes = [
  { path: 'users-list', component: UsersListComponent },
  { path: 'user-edit/:id', component: UserEditComponent },
  { path: '', redirectTo: 'users-list', pathMatch: 'full' },
];

@NgModule({
  declarations: [UsersListComponent, UserEditComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    UtilsLibModule,
  ],
  exports: [],
})
export class UserManagementLibModule {}
