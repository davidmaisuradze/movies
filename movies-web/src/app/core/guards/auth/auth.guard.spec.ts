import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: AuthService, useValue: {isAuthenticated: () => true}}
      ]
    });
    // inject both the component and the dependent service.
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true', () => {
    authService.isAuthenticated = () => true;
    expect(guard.canActivate()).toBe(true);
  });

  it('should return false', () => {
    authService.isAuthenticated = () => false;
    expect(guard.canActivate()).toBe(false);
  });

});
