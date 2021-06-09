import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {createForm, validForm} from '../../../../shared/helpers/form.helper';
import {ViewFieldSet} from '../../../../shared/models/field-set';
import {Store} from '@ngrx/store';
import {MovieModelDto} from '../../models/movie-model-dto';
import {CreateMovieRequest} from '../../actions/movie.actions';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {State} from '../../reducers/movie.reducer';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  public formFields = {
    title: {
      value: null,
      label: 'Title',
      validators: {required: true},
      view: ViewFieldSet.vertical
    },
    description: {
      value: null,
      label: 'Description',
      validators: {required: true},
      view: ViewFieldSet.vertical
    },
    imageUrl: {
      value: null,
      label: 'Image Url',
      validators: {required: true},
      view: ViewFieldSet.vertical
    }
  };
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = createForm(this.fb, this.formFields);
  }

  ngOnInit() {
  }

  save() {
    if (validForm(this.form, this.formFields)) {
      this.store.dispatch(
        CreateMovieRequest({
          payload: {
            ...this.form.value,
          } as MovieModelDto
        })
      );
    }
  }
}
