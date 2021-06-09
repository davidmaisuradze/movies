import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UnAuthGuard } from './un-auth.guard';

describe('UnAuthGuard', () => {
  let guard: UnAuthGuard;
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
    guard = TestBed.inject(UnAuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true', () => {
    authService.isAuthenticated = () => false;
    expect(guard.canActivate()).toBe(true);
  });

  it('should return false', () => {
    authService.isAuthenticated = () => true;
    expect(guard.canActivate()).toBe(false);
  });

});
