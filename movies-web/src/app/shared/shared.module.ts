import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './modules/material.module';

// ===== COMPONENTS =====
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { FieldSetComponent } from './components/field-set/field-set.component';
import { FieldSetErrorComponent } from './components/field-set/field-set-error/field-set-error.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

// ===== DIRECTIVES =====
import { FieldSetDirective } from './directives/fieldset.directive';

// ===== PIPES =====
import { TruncateTextPipe } from './pipes/truncate/truncate-text.pipe';

const SHARED_MODULES: any[] = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  RouterModule,
  FontAwesomeModule,
  MaterialModule
];

const SHARED_COMPONENTS: any[] = [
  PageNotFoundComponent,
  HeaderComponent,
  FooterComponent,
  ContentComponent,
  FieldSetComponent,
  FieldSetErrorComponent,
  ConfirmModalComponent
];

const ENTRY_COMPONENTS: any[] = [FieldSetComponent, FieldSetErrorComponent, ConfirmModalComponent];

const SHARED_DIRECTIVES: any[] = [
  FieldSetDirective
];

const PIPES: any[] = [TruncateTextPipe];

/*just import the shared module in different  modules to reuse shared component*/
@NgModule({
  imports: [...SHARED_MODULES],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS, SHARED_DIRECTIVES, ...PIPES],
  declarations: [...SHARED_COMPONENTS, ...SHARED_DIRECTIVES, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS, ...SHARED_COMPONENTS]
})
export class SharedModule {
}
