import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-field-set-error',
  templateUrl: './field-set-error.component.html',
  styleUrls: ['./field-set-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldSetErrorComponent implements OnInit {
  private _message$ = new BehaviorSubject(null);
  private _errors: ValidationErrors | null;

  public message$ = this._message$.asObservable();

  // we can pass custom error messages here
  @Input()
  public errorMessages = {};

  @Input() set errors(value: ValidationErrors | null) {
    this._errors = value;
    this.updateErrorMessage();
  }

  constructor() {
  }

  ngOnInit() {
  }

  private updateErrorMessage(): string | null {
    if (!this._errors) {
      return null;
    }
    // TODO: move constants to validation.messages.ts
    const messages = {
      required: () => 'This field is required',
      maxlength: () =>
        `The text entered exceeds the maximum length ${this._errors.maxlength.requiredLength}`,
      minlength: () =>
        `The field needs to be at least ${this._errors.minlength.requiredLength} characters long`,
      max: () => `The field value must be less than ${this._errors.max.max}`,
      min: () => `The field value must be greater than ${this._errors.min.min}`,
      email: () => 'Invalid  email  address.',
      pattern: () => 'The field is invalid.',
      mismatch: (messageText: string) => messageText
    };

    const dynamicMessageKeywords = ['mismatch'];

    const message = Object.keys(messages).reduce((acc, key) => {
      if (!acc) {
        if (this.errorMessages.hasOwnProperty(key)) {
          return this.errorMessages[key];
        }
        if (this._errors.hasOwnProperty(key)) {
          return dynamicMessageKeywords.includes(key) ? messages[key](this._errors[key]) : messages[key]();
        }
      }
      return acc;
    }, null);
    this._message$.next(message);
  }
}
