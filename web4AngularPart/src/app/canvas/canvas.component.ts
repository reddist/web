import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Point} from '../model/point';

// import { CoordinatesComponent } from '../coordinates';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, OnChanges {

  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;
  private currentR = 2;
  public canvasHeight = 450;
  public canvasWidth = 450;
  private scaleParameter = 34 - (450 - this.canvasWidth) / 100 * 8;
  @Output() updatePoints: EventEmitter<Point>;
  @Input() points: Point[];

  constructor() {
    this.updatePoints = new EventEmitter<Point>();
    window.onload = () => {
      // this.draw(2);
      // document.getElementById('canvas').onresize = () => {this.draw(this.currentR); };
      this.onResize();
    };
  }

  ngOnInit() {
    const draw = () => { this.draw(this.currentR); };
    draw();
    /*const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.onresize = () => { setTimeout(() => this.draw(this.currentR), 40); };
    canvas.onload = () => { setTimeout(() => this.draw(this.currentR), 40); };
    console.log('Canvas has loaded!');
    function getCanvas() {
      const canvasIn = document.getElementById('canvas') as HTMLCanvasElement;
      console.log('!!!!!!!!!!!canvas is ' + canvasIn);
      if (canvasIn === undefined) {
        setTimeout(getCanvas, 20);
      } else {
        draw();
      }
    }
    getCanvas();*/
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    // this.draw(this.currentR);
    this.onResize();
    // console.log('Simple change!');
    // if (this.points) {
    //   this.points.forEach((point) => this.drawClick(point));
    // }
  }

  onResize() {
    this.canvasWidth = screen.width * 0.45;
    if (screen.width < 731) {
      this.canvasWidth = screen.width * 0.9;
      document.getElementById('canvasDiv').style.marginLeft = '5%';
      if (this.canvasWidth > 450) {
        this.canvasWidth = 450;
        const marginLeft = (screen.width - this.canvasWidth) * 100.0 / screen.width / 2.0;
        document.getElementById('canvasDiv').style.marginLeft = marginLeft + '%';
      }
    }
    if (screen.width > 731 && screen.width < 1121) {
      this.canvasWidth = screen.width * 0.45;
      if (this.canvasWidth > 450) {
        this.canvasWidth = 450;
      }
      const marginLeft = (screen.width - 2.0 * this.canvasWidth) * 100.0 / screen.width / 4.0;
      document.getElementById('canvasDiv').style.marginLeft = marginLeft + '%';
    }
    if (this.canvasWidth > 450) {
      this.canvasWidth = 450;
    }
    if (screen.width > 1120) {
      document.getElementById('canvasDiv').style.marginLeft = 'calc(25% - 225px)';
    }
    this.canvasHeight = this.canvasWidth;
    this.scaleParameter = 34 - (450 - this.canvasWidth) / 100 * 8;
    this.canvas.nativeElement.height = this.canvasHeight;
    this.canvas.nativeElement.width = this.canvasWidth;
    setTimeout(() => this.draw(this.currentR), 100);
  }

  submitOnClick(event) {
    const canvasCoordinates = this.canvas.nativeElement.getBoundingClientRect();
    const hitX = event.clientX - canvasCoordinates.left;
    const hitY = event.clientY - canvasCoordinates.top;
    const doubleX = (hitX - this.canvasWidth / 2.0) / this.scaleParameter;
    const doubleY = (this.canvasHeight / 2.0 - hitY) / this.scaleParameter;
    const point: Point = {
      x: Number(doubleX.toPrecision(3)),
      y: Number(doubleY.toPrecision(3)),
      r: this.currentR,
      result: 'false'
    };
    this.updatePoints.emit(point);
  }

  draw(r) {
    this.currentR = r;
    console.log('calling draw()...');
    // axis
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    ctx.strokeStyle = 'azure';
    ctx.lineWidth = 2;
    // Oy
    ctx.beginPath();
    ctx.moveTo(this.canvasWidth / 2.0, this.canvasHeight / 2.0);
    ctx.lineTo(this.canvasWidth - 30, this.canvasHeight / 2.0);
    ctx.moveTo(this.canvasWidth - 25, this.canvasHeight / 2.0);
    ctx.lineTo(this.canvasWidth - 30, this.canvasHeight / 2.0 + 5);
    ctx.moveTo(this.canvasWidth - 25, this.canvasHeight / 2.0);
    ctx.lineTo(this.canvasWidth - 30, this.canvasHeight / 2.0 - 5);
    ctx.stroke();
    ctx.moveTo(this.canvasWidth / 2.0, this.canvasHeight / 2.0);
    ctx.lineTo(30, this.canvasHeight / 2.0);
    ctx.moveTo(this.canvasWidth / 2.0, this.canvasHeight / 2.0);
    ctx.lineTo(this.canvasWidth / 2.0, this.canvasHeight - 30);
    ctx.stroke();
    ctx.moveTo(this.canvasWidth / 2.0, this.canvasHeight / 2.0);
    ctx.lineTo(this.canvasWidth / 2.0, 30);
    ctx.moveTo(this.canvasWidth / 2.0, 25);
    ctx.lineTo(this.canvasWidth / 2.0 + 5, 35);
    ctx.moveTo(this.canvasWidth / 2.0 - 5, 35);
    ctx.lineTo(this.canvasWidth / 2.0, 25);
    ctx.stroke();

    if (r >= 0) {
// circle
    ctx.moveTo(this.canvasWidth / 2.0, this.canvasHeight / 2.0 - this.scaleParameter / 2.0 * r);
    ctx.arc(this.canvasWidth / 2.0, this.canvasHeight / 2.0, this.scaleParameter / 2.0 * r, 1.5 * Math.PI, 0);
    ctx.stroke();

// triangle
    ctx.moveTo(this.canvasWidth / 2.0, this.canvasHeight / 2.0 + this.scaleParameter / 2.0 * r);
    ctx.lineTo(this.canvasWidth / 2.0 + this.scaleParameter / 2.0 * r, this.canvasHeight / 2.0);
    ctx.stroke();

// rectangle
    ctx.moveTo(this.canvasWidth / 2.0, this.canvasHeight / 2.0 - this.scaleParameter * r);
    ctx.lineTo(this.canvasWidth / 2.0 - this.scaleParameter * r, this.canvasHeight / 2.0 - this.scaleParameter * r);
    ctx.lineTo(this.canvasWidth / 2.0 - this.scaleParameter * r, this.canvasHeight / 2.0);
    ctx.stroke();
  } else {
    // rectangle
    ctx.moveTo(this.canvasWidth / 2.0, this.canvasHeight / 2.0 + this.scaleParameter * (-r));
    ctx.lineTo(this.canvasWidth / 2.0 + this.scaleParameter * (-r), this.canvasHeight / 2.0 + this.scaleParameter * (-r));
    ctx.lineTo(this.canvasWidth / 2.0 + this.scaleParameter * (-r), this.canvasHeight / 2.0);
    ctx.stroke();

    // circle
    ctx.moveTo(this.canvasWidth / 2.0, this.canvasHeight / 2.0);
    ctx.arc(this.canvasWidth / 2.0, this.canvasHeight / 2.0, this.scaleParameter / 2.0 * (-r), 0.5 * Math.PI, Math.PI );
    ctx.stroke();

    // triangle
    ctx.lineTo(this.canvasWidth / 2.0, this.canvasHeight / 2.0 - this.scaleParameter / 2.0 * (-r));
    ctx.stroke();
  }
    this.drawHits();
}

  check(x, y): boolean {
    let r = this.currentR;
    if (x === 0 && y === 0) { // point (0 ; 0) is always true
      return true;
    }
    if (r >= 0) {
      // rectangle
      if (x <= 0 && y >= 0) {
        if (x >= -r && y <= r) {
          return true;
        }
      }
      // circle
      if (x >= 0 && y >= 0) {
        if (x * x + y * y <= (r * r / 4.0)) {
          return true;
        }
      }
      // whitespace
      if (x < 0 && y < 0) {
        return false;
      }
      // triangle
      if (x >= 0 && y <= 0) {
        if (y >= x - r / 2.0) {
          return true;
        }
      }
      return false;
    }
    if (r <= 0) {
      // rectangle
      if (x >= 0 && y <= 0) {
        if (x <= Math.abs(r) && y >= -Math.abs(r)) {
          return true;
        }
      }
      // circle
      if (x <= 0 && y <= 0) {
        if (x * x + y * y <= (r * r / 4.0)) {
          return true;
        }
      }
      // whitespace
      if (x > 0 && y > 0) {
        return false;
      }
      // triangle
      if (x <= 0 && y >= 0) {
        // console.log('false');
        if (y <= (x - r / 2.0)) {
          return true;
        }
      }
      return false;
    }
  }

  drawHits() {
    let point: Point;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.points.length; i++) {
      point = this.points[i];
      const x = point.x;
      const y = point.y;
      let color = 'darkred';
      if ( this.check(x, y)) {
        color = 'azure';
      }
      const canvas = this.canvas.nativeElement;
      if (canvas.getContext) {
        const context = canvas.getContext('2d');
        context.beginPath();
        context.arc(this.canvasWidth / 2.0 + x * this.scaleParameter,
      this.canvasHeight / 2.0 - y * this.scaleParameter,
      3, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.closePath();
      }
    }
  }
}
