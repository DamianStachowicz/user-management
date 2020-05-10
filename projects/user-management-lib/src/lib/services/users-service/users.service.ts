import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../dto/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUri = 'localhost:8080/api/v0';

  constructor(private httpClient: HttpClient) {}

  getUsersList(): Observable<User[]> {
    // mocked values for the time being
    return new Observable<User[]>((observer) => {
      observer.next([
        {
          id: 0,
          name: 'Juliusz Słowacki',
          permissions: ['USRADD', 'USREDIT', 'USRRMV'],
        },
        {
          id: 1,
          name: 'Adam Mickiewicz',
          permissions: [],
        },
      ]);
      observer.complete();
    });
    return this.httpClient.get<User[]>(`${this.baseUri}/users`);
  }

  getUser(id: string): Observable<User> {
    return id === '0'
      ? new Observable<User>((observer) => {
          observer.next({
            id: 0,
            name: 'Juliusz Słowacki',
            permissions: ['USRADD', 'USREDIT', 'USRRMV'],
          });
          observer.complete();
        })
      : new Observable<User>((observer) => {
          observer.next({
            id: 1,
            name: 'Adam Mickiewicz',
            permissions: [],
          });
          observer.complete();
        });
    return this.httpClient.get<User>(`${this.baseUri}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUri}/users/`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUri}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUri}/users/${id}`);
  }
}
