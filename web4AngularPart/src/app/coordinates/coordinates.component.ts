import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {Point} from '../model/point';
import {PointService} from '../services/point.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.css']
})
export class CoordinatesComponent implements OnInit {

  point: Point;
  valueY = 0;
  selectedValueX = 0;
  selectedValueR = 2;
  public coordinatesWidth = 450;

  @Output() private updatePoints: EventEmitter<Point>;
  @Output() private deletePointsEmitter = new EventEmitter<boolean>();
  @Output() changedR = new EventEmitter();

  redraw() {
    console.log('redrawing...');
    this.changedR.emit(this.selectedValueR);
    console.log('redrawed.');
  }

  deletePoints() {
    this.deletePointsEmitter.emit(true);
  }

  savePoint(pointForm) {
    // if ((+this.radiusSelected[0]) <= 0) {
    //   this.messageService.add({severity: 'error', summary: 'Неверно введен радиус', detail: 'Выберите положительный радиус'});
    //   return;
    // }
    // if (this.point.yCoordinate < -3 || this.point.yCoordinate > 3) {
    //   this.messageService.add({severity: 'error', summary: 'Неверно введена координата Y', detail: 'Не находится в интервале (-3;3)'});
    //   return;
    // }
    if (pointForm.valid || true) {
      this.point.x = this.selectedValueX;
      this.point.y = this.valueY;
      this.point.r = this.selectedValueR;
      this.point.result = 'false';
      this.updatePoints.emit(this.point);
    } else {
      this.messageService.add({severity: 'error', summary: 'Неверно введены даные', detail: 'Введите данные корректно'});
    }
  }

  constructor(private pointService: PointService,
              private messageService: MessageService) {
    this.updatePoints = new EventEmitter<Point>();
    this.initializePoint();
  }

  ngOnInit() {
    this.onResize();
  }

  initializePoint() {
    this.point = {
      // id: null,
      x: 0,
      y: 0,
      r: 2,
      result: 'false'
    };
  }

  onResize() {
    this.coordinatesWidth = screen.width * 0.45;
    if (screen.width < 731) {
      this.coordinatesWidth = screen.width * 0.9;
      document.getElementById('coordinates').style.marginRight = '5%';
      if (this.coordinatesWidth > 450) {
        this.coordinatesWidth = 450;
        const marginRight = (screen.width - this.coordinatesWidth) * 100.0 / screen.width / 2.0;
        document.getElementById('coordinates').style.marginRight = marginRight + '%';
      }
    }
    if (screen.width > 731 && screen.width < 1121) {
      this.coordinatesWidth = screen.width * 0.45;
      if (this.coordinatesWidth > 450) {
        this.coordinatesWidth = 450;
      }
      const marginRight = (screen.width - 2.0 * this.coordinatesWidth) * 100.0 / screen.width / 4.0;
      document.getElementById('coordinates').style.marginRight = marginRight + '%';
    }
    if (this.coordinatesWidth > 450) {
      this.coordinatesWidth = 450;
    }
    if (screen.width > 1120) {
      document.getElementById('coordinates').style.marginRight = 'calc(25% - 225px)';
    }
  }
}
