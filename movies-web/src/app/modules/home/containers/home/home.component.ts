import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../auth/reducers/auth.reducer';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthSelectors } from '../../../auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  public user$: Observable<any>;

  constructor(private store: Store<State>) {
    this.user$ = this.store.pipe(takeUntil(this._destroyed$), select(AuthSelectors.selectUser));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
