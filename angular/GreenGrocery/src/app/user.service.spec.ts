// user.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from './user.model';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', (done: DoneFn) => {
    const user: User = { username: 'testuser', email: 'test@example.com', password: 'password123', address: '123 Test St' };
    service.register(user).subscribe((registeredUser) => {
      expect(registeredUser).toEqual(user);
      done();
    });
  });

  it('should get all users', (done: DoneFn) => {
    const user1: User = { username: 'testuser1', email: 'test1@example.com', password: 'password123', address: '123 Test St' };
    const user2: User = { username: 'testuser2', email: 'test2@example.com', password: 'password456', address: '456 Test St' };
    service.register(user1).subscribe();
    service.register(user2).subscribe();
    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toContain(user1);
      expect(users).toContain(user2);
      done();
    });
  });
});