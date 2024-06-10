import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { UserService } from '../user.service';
import { User } from '../user.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on successful login', () => {
    const mockUsers: User[] = [
      { username: 'testuser', email: 'test@example.com', password: 'password123', address: '123 Test St' }
    ];
    userService.getUsers.and.returnValue(of(mockUsers));

    component.loginForm.setValue({ username: 'testuser', password: 'password123' });
    component.onSubmit();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show an alert on unsuccessful login', () => {
    spyOn(window, 'alert');
    const mockUsers: User[] = [
      { username: 'testuser', email: 'test@example.com', password: 'password123', address: '123 Test St' }
    ];
    userService.getUsers.and.returnValue(of(mockUsers));

    component.loginForm.setValue({ username: 'wronguser', password: 'wrongpassword' });
    component.onSubmit();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Invalid username or password');
  });
});