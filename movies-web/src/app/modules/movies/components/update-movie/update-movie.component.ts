import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {createForm, validForm} from '../../../../shared/helpers/form.helper';
import {ViewFieldSet} from '../../../../shared/models/field-set';
import {Store} from '@ngrx/store';
import {MovieModelDto} from '../../models/movie-model-dto';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UpdateMovieRequest} from '../../actions/movie.actions';
import {State} from '../../reducers/movie.reducer';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss']
})
export class UpdateMovieComponent implements OnInit {
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
    if (this.data && this.data.movie) {
      this.form.patchValue({
        ...this.data.movie
      });
    }
  }

  save() {
    if (validForm(this.form, this.formFields)) {
      this.store.dispatch(
        UpdateMovieRequest({
          payload: {
            ...this.form.value,
            _id: this.data.movie._id
          } as MovieModelDto
        })
      );
    }
  }
}
