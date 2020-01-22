import { Component, OnInit } from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import {Point} from '../model/point';
import {PointService} from '../services/point.service';
import {MessageService} from 'primeng/api';
import {AuthService} from '../services/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  points: Point[] = [];

  constructor(private pointService: PointService,
              private authService: AuthService,
              private messageService: MessageService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.getPoints();
    console.log('mainpage has loaded!');
  }

  updatePoints(point: Point) {
    this.pointService.savePoint(point).subscribe((result: Point[]) => {
      this.points = result;
    }, (error) => {
      if (error.status >= 500 || error.status === 0) {
        this.messageService.add({severity: 'error', summary: 'Ой! Сервер больно упал'});
      }
    });
  }

  getPoints() {
    this.pointService.getAllPoints().subscribe((data) =>
      this.points = data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    this.cookieService.delete('login');
    this.cookieService.delete('password');
    document.cookie = 'login=;max-age=-1';
    document.cookie = 'password=;max-age=-1';
    this.authService.isLoggedIn = false;
  }

  deletePoints(b: boolean) {
    if (b) {
      this.pointService.deleteAllPoints().subscribe((result) => {
        this.points = [];
        this.messageService.add({severity: 'success', summary: 'Таблица очищена'});
      }, (error) =>
        this.messageService.add({severity: 'error', summary: 'Произошла ошибка'}));
    }
  }

}
