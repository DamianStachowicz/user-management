import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { User } from '../../dto/user.interface';
import { UsersService } from './users.service';

describe('UsersService', () => {
  const users: User[] = [
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

  let injector: TestBed;
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    injector = getTestBed();
    service = injector.inject(UsersService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsersList', () => {
    it('should return a users list', () => {
      service.getUsersList().subscribe((data) => {
        expect(data.length).toBe(3);
        expect(data).toEqual(users);
      });

      // TODO: uncomment this when real backend is avaible
      // const req = httpMock.expectOne(`${service.baseUri}/users`);
      // expect(req.request.method).toBe('GET');
      // req.flush(users);
    });
  });

  describe('getUser', () => {
    it('should return a user', () => {
      service.getUser('0').subscribe((data) => {
        expect(data).toEqual(users[0]);
      });

      // TODO: uncomment this when real backend is avaible
      // const req = httpMock.expectOne(`${service.baseUri}/user/0`);
      // expect(req.request.method).toBe('GET');
      // req.flush(users[0]);
    });
  });

  describe('createUser', () => {
    it('should create a user', () => {
      const newUser: User = {
        id: null,
        name: 'Leopold Staff',
        permissions: ['TEST_0, TEST_1'],
      };

      service.createUser(newUser).subscribe((data) => {
        expect(data).toEqual(newUser);
      });

      // TODO: uncomment this when real backend is avaible
      // const req = httpMock.expectOne(`${service.baseUri}/users`);
      // expect(req.request.method).toBe('POST');
      // export(req.request.body).toBe(newUser);
      // req.flush(users[0]);
    });
  });

  describe('updateUser', () => {
    it('should update a user', () => {
      const newUser: User = {
        id: null,
        name: 'Leopold Staff',
        permissions: ['TEST_0, TEST_1'],
      };

      service.updateUser(newUser).subscribe((data) => {
        expect(data).toEqual(newUser);
      });

      // TODO: uncomment this when real backend is avaible
      // const req = httpMock.expectOne(`${service.baseUri}/user/0`);
      // expect(req.request.method).toBe('PUT');
      // export(req.request.body).toBe(newUser);
      // req.flush(users[0]);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', () => {
      service.deleteUser('0').subscribe((data) => {
        expect(data).toBeUndefined();
      });

      // TODO: uncomment this when real backend is avaible
      // const req = httpMock.expectOne(`${service.baseUri}/users/0`);
      // expect(req.request.method).toBe('DELETE');
      // req.flush(users[0]);
    });
  });
});
