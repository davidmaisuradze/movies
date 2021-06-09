import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState, State } from '../../reducers/auth.reducer';
import { AuthSelectors } from '../../index';
import { MemoizedSelector } from '@ngrx/store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<State>;
  let mockAuthSelector: MemoizedSelector<State, any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        provideMockStore({initialState}),
        FormBuilder
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);
    mockAuthSelector = store.overrideSelector(AuthSelectors.selectIsAuthenticated, true);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
