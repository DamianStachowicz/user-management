import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsLibModule } from 'forms-lib';
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UtilsLibModule,
    FormsLibModule,
  ],
  exports: [],
})
export class UserManagementLibModule {}
