import { AbstractControl } from '@angular/forms';

export function matchControlsValidator(controlName, matchingControlName, errorMessage) {
  return (formControls: AbstractControl) => {
    const controlsList = formControls['controls'];
    const control = controlsList[controlName];
    const matchingControl = controlsList[matchingControlName];

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mismatch: errorMessage});
    } else {
      matchingControl.setErrors(null);
    }
  };
}
