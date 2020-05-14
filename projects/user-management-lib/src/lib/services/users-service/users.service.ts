import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { UserParams } from '../../interfaces/user-params.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUri = 'localhost:8080/api/v0';

  // temporary mock used until suitable backend is provided
  private users: User[] = [
    {
      id: '0',
      name: 'Juliusz Słowacki',
      permissions: ['USRADD', 'USREDIT', 'USRRMV'],
    },
    {
      id: '1',
      name: 'Adam Mickiewicz',
      permissions: ['USRADD'],
    },
    {
      id: '2',
      name: 'Cyprian Kamil Norwid',
      permissions: [],
    },
  ];

  constructor(private httpClient: HttpClient) {}

  getUsersList(params?: UserParams): Observable<User[]> {
    // mocked values for the time being
    return new Observable<User[]>((observer) => {
      observer.next(
        this.users.filter(
          (user) =>
            user.name.toLowerCase().includes(params.username.toLowerCase()) &&
            (!params.permissions ||
              user.permissions.includes(params.permissions.toUpperCase()))
        )
      );
      observer.complete();
    });
    return this.httpClient.get<User[]>(`${this.baseUri}/users`);
  }

  getUser(id: string): Observable<User> {
    const filtered = this.users.filter((user) => user.id === id);
    return new Observable<User>((observer) => {
      observer.next(filtered && filtered[0]);
      observer.complete();
    });
    return this.httpClient.get<User>(`${this.baseUri}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return new Observable<User>((observer) => {
      observer.next(user);
      observer.complete();
    });
    return this.httpClient.post<User>(`${this.baseUri}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return new Observable<User>((observer) => {
      observer.next(user);
      observer.complete();
    });
    return this.httpClient.put<User>(`${this.baseUri}/users/${user.id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    this.users = this.users.filter((user) => user.id !== id);
    return new Observable<User>((observer) => {
      observer.next();
      observer.complete();
    });
    return this.httpClient.delete(`${this.baseUri}/users/${id}`);
  }
}
