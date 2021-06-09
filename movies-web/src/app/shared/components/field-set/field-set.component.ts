import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FieldSet, ViewFieldSet } from '../../models/field-set';

@Component({
  selector: 'app-field-set',
  templateUrl: './field-set.component.html',
  styleUrls: ['./field-set.component.scss']
})
export class FieldSetComponent implements OnInit {
  private _control: AbstractControl;
  private _fieldset = {} as FieldSet;

  @Input() template: TemplateRef<any>;
  @Input() set control(value: AbstractControl) {
    this._control = value;
  }
  @Input() set required(value: boolean) {
    if (!this._fieldset.validators) {
      this._fieldset.validators = {};
    }
    this._fieldset.validators.required = value;
  }

  @Input() set options(value: FieldSet) {
    this._fieldset = value || this._fieldset;
  }

  constructor() {}

  ngOnInit() {}

  get hidden() {
    return this._fieldset.hidden;
  }
  get label() {
    return this._fieldset.label;
  }
  get control() {
    return this._control;
  }
  get verticalLayout() {
    return this._fieldset && this._fieldset.view === ViewFieldSet.vertical;
  }
  get required() {
    return this._fieldset && !!(this._fieldset.validators && this._fieldset.validators.required);
  }
}
