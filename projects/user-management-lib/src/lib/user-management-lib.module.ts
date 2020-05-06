import { NgModule } from '@angular/core';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const routes = [
  { path: 'users-list', component: UsersListComponent },
  { path: '', redirectTo: 'users-list', pathMatch: 'full' }
];

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule
  ],
  exports: []
})
export class UserManagementLibModule { }
