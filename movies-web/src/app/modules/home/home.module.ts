import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

// ===== MODULES =====
import { HomeRoutingModule } from './home-routing.module';

// ===== COMPONENTS =====
import { HomeComponent } from './containers/home/home.component';

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  declarations: [HomeComponent],
  entryComponents: [],
  providers: []
})
export class HomeModule {
}
