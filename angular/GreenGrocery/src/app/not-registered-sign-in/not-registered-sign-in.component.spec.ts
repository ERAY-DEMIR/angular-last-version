import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NotRegisteredSignInComponent } from './not-registered-sign-in.component';
import { UserService } from '../user.service';
import { TestimonialCommentService } from '../testimonial-comment.service';
import { User } from '../user.model';
import { TestimonialComment } from '../testimonial-comment.model';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';

describe('NotRegisteredSignInComponent', () => {
  let component: NotRegisteredSignInComponent;
  let fixture: ComponentFixture<NotRegisteredSignInComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let testimonialCommentService: jasmine.SpyObj<TestimonialCommentService>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['register']);
    const testimonialCommentServiceSpy = jasmine.createSpyObj('TestimonialCommentService', ['addTestimonial']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
  
    // Set up authService.isAuthenticated to return a BehaviorSubject that emits the authentication status
    const isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    authServiceSpy.isAuthenticated = isAuthenticatedSubject.asObservable();
  
    await TestBed.configureTestingModule({
      declarations: [NotRegisteredSignInComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: TestimonialCommentService, useValue: testimonialCommentServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(NotRegisteredSignInComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    testimonialCommentService = TestBed.inject(TestimonialCommentService) as jasmine.SpyObj<TestimonialCommentService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register a user and navigate to login on successful registration', () => {
    const mockUser: User = { username: 'testuser', email: 'test@example.com', password: 'password123', address: '123 Test St' };
    userService.register.and.returnValue(of(mockUser));

    component.registerForm.setValue(mockUser);
    component.onSubmit();

    expect(userService.register).toHaveBeenCalledWith(mockUser);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not call register if the form is invalid', () => {
    component.registerForm.setValue({ username: '', email: 'invalid-email', password: '', address: '' });
    component.onSubmit();

    expect(userService.register).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should submit a testimonial', () => {
    const mockTestimonial: TestimonialComment = { username: 'testuser', comment: 'Great service!', rating: 5 };
    testimonialCommentService.addTestimonial.and.returnValue(of(mockTestimonial));

    component.testimonialForm.setValue({ comment: 'Great service!', rating: 5 });
    component.registerForm.controls['username'].setValue('testuser');
    component.onSubmitTestimonial();

    expect(testimonialCommentService.addTestimonial).toHaveBeenCalledWith(mockTestimonial);
  });

  it('should not submit a testimonial if the form is invalid', () => {
    component.testimonialForm.setValue({ comment: '', rating: null });
    component.onSubmitTestimonial();

    expect(testimonialCommentService.addTestimonial).not.toHaveBeenCalled();
  });

  it('should change rating', () => {
    const rating = 4;
    component.changeRating(rating);
    expect(component.testimonialForm.controls['rating'].value).toBe(rating);
  });
});
