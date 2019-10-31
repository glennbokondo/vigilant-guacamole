import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.sass']
})
export class ImageListComponent implements OnInit {
  @Input() skils;
  rows: 4;
  columns: 2;
  constructor() { }

  ngOnInit() {
  }

}
