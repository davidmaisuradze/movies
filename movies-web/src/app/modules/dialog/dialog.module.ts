import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material.module';
import { DialogCloseComponent } from './components/dialog-close/dialog-close.component';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { DialogManagerService } from './services/dialog-manager.service';

const COMPONENTS = [DialogCloseComponent, DialogHeaderComponent, DialogContentComponent];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  entryComponents: [],
  providers: [DialogManagerService]
})

export class DialogModule {
}
