import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;
  constructor() {}

  ngOnInit() {}
}
