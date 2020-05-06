import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../dto/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUri = 'localhost:8080/api/v0';

  constructor(private httpClient: HttpClient) { }

  getUsersList(): Observable<User[]> {
    console.log(`szczelam do ${this.baseUri}/users`);
    return this.httpClient.get<User[]>(`${this.baseUri}/users`);
  }
}
