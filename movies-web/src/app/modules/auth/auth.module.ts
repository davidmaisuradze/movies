import { NgModule } from '@angular/core';

// ===== MODULES =====
import { AuthRoutingModule } from './auth-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from '../dialog';

// ===== STORE =====
import { authReducer } from './reducers/auth.reducer';
import { AuthEffects } from './effects/auth.effects';

// ===== COMPONENTS =====
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';

@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    AuthRoutingModule,
    DialogModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
