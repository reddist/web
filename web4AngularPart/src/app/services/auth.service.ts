import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  // private apiUrl = 'http://localhost:8080/myapp/';
  // private apiUrl = 'http://localhost:20580/web4/';
  private apiUrl = 'http://se.ifmo.ru:20580/web4/';

  public isLoggedIn = false;
  public redirectUrl: string;

  constructor(private httpClient: HttpClient) {
  }

  login(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'login', data)
      .pipe(tap(() => this.isLoggedIn = true));
  }

  register(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'register', data);
  }
}
