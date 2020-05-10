import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../dto/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUri = 'localhost:8080/api/v0';

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

  getUsersList(): Observable<User[]> {
    // mocked values for the time being
    return new Observable<User[]>((observer) => {
      observer.next(this.users);
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
    return this.httpClient.post<User>(`${this.baseUri}/users/`, user);
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
