import {Component, Input, OnInit} from '@angular/core';
import {Point} from '../model/point';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() points: Point[];

  constructor() { }

  ngOnInit() {
  }

}
