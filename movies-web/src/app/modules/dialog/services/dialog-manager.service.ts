import { Component, Injectable } from '@angular/core';
import { DEFAULT_PANEL_CLASS } from '../../../core/constants/dialog.constants';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Injectable()
export class DialogManagerService {
  private dialogs: MatDialogRef<Component>[] = [];

  constructor(private dialog: MatDialog) {
  }

  open(
    component: any,
    params: {
      disableClose?: boolean;
      data?: any;
      backdropClass?: string;
      panelClass?: string;
    }
  ) {
    const {data, panelClass, disableClose, backdropClass} = params;

    const activeDialog = this.dialog.open(component, {
      disableClose,
      data,
      backdropClass,
      autoFocus: false,
      panelClass: panelClass ? [DEFAULT_PANEL_CLASS, panelClass] : DEFAULT_PANEL_CLASS
    });
    // add dialog at the beginning of an array, so when I call close() method for concrete component type
    // close method will close the latest opened modal for this component type
    this.dialogs.unshift(activeDialog);
    activeDialog
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        const index = this.dialogs.indexOf(activeDialog);
        if (index > -1) {
          this.dialogs.splice(index, 1);
        }
      });
  }

  close(component?: any) {
    if (!!component) {
      const dialog: MatDialogRef<Component> = this.dialogs.find(
        item => item.componentInstance instanceof component
      );
      if (dialog) {
        const index = this.dialogs.indexOf(dialog);
        this.dialogs.splice(index, 1);
        dialog.close();
      }
    } else {
      // close all dialogs
      while (this.dialogs.length) {
        this.dialogs.pop().close();
      }
    }
  }
}
