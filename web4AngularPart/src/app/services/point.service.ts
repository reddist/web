import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Point} from '../model/point';

@Injectable()
export class PointService {

  // private apiUrl = 'http://localhost:8080/myapp/api';
  // private apiUrl = 'http://localhost:20580/web4/api';
  private apiUrl = 'http://se.ifmo.ru:20580/web4/api';

  constructor(private http: HttpClient) {
  }

  getAllPoints(): Observable<Point[]> {
    // return this.http.get<Point[]>(this.apiUrl);
    return this.http.get<Point[]>(this.apiUrl + '/get');
  }

  savePoint(point: Point): Observable<Point[]> {
    console.log('sending point {"x":' + point.x + ',"y":' + point.y + ',"r":' + point.r + '}...');
    // const result: Observable<Point[]> = this.http.post<Point[]>(this.apiUrl, point);
    const result: Observable<Point[]> = this.http.post<Point[]>(this.apiUrl + '/save', point);
    console.log('done.');
    return result;
  }

  deleteAllPoints(): Observable<any> {
    return this.http.delete(this.apiUrl + '/delete');
  }
}
