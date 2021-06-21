import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {createForm, validForm} from '../../../../shared/helpers/form.helper';
import {ViewFieldSet} from '../../../../shared/models/field-set';
import {Store} from '@ngrx/store';
import {MovieModelDto} from '../../models/movie-model-dto';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateMovieRequest, UpdateMovieRequest} from '../../store/actions/movie.actions';
import {State} from '../../store/reducers/movie.reducer';

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
    imageData: {value: null, required: false},
  };
  public form: FormGroup;
  public uploadedImage: any;

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
            _id: this.data.movie._id,
            imageData: this.uploadedImage
          } as any
        })
      );
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.uploadedImage = event.target.files[0];
    }
  }
}
