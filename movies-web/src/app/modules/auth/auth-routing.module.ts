import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ===== COMPONENTS =====
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { UnAuthGuard } from '../../core/guards/un-auth/un-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {
}
