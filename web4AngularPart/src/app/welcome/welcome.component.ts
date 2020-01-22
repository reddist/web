import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService,
              private cookieService: CookieService) { }

  ngOnInit() {
  }

  login(authForm) {
    // console.log(this.username);
    // console.log(this.password);
    if ((this.username === null || this.username === '' || this.username === undefined) ||
        (this.password === null || this.password === '' || this.password === undefined)) {
      this.messageService.add({severity: 'warn', summary: 'Логин и/или пароль не введены'});
      return;
    }
    if (authForm.valid) {
      this.authService.login({
        login: this.username,
        password: this.password,
        email: this.username
      }).subscribe((result: any) => {
        console.log(JSON.stringify(result));
        if (result.token && result.token !== '' && result.token !== null && result.token !== undefined) {
          // document.cookie = 'login=' + this.username;
          // document.cookie = 'password=' + this.password;
          this.cookieService.set('login', encodeURIComponent(this.username));
          this.cookieService.set('password', encodeURIComponent(this.password));
          localStorage.setItem('login', this.username);
          localStorage.setItem('password', this.password);
          localStorage.setItem('token', result.token);
          this.router.navigate(['mainpage']);
        } else {
          if (result.token === '') {
            this.messageService.add({severity: 'error', summary: result.summary});
            return;
          }
          this.messageService.add({severity: 'warn', summary: 'Запрос дошёл до сервера, но он он ничего не ответил.'});
        }
      }, (error) => {
        if (error.status >= 500 || error.status === 0) {
          this.messageService.add({severity: 'error', summary: 'Ой! Сервер больно упал'});
        }
        if (error.status <= 400 && error.status >= 300) {
          this.messageService.add({severity: 'error', summary: 'Такого пользователя не существует'});
        }
      });
    } else {
      this.handleInvalid();
    }
  }

  handleInvalid() {
    if (this.password.length < 6) {
      this.messageService.add({severity: 'error', summary: 'Пароль короче 6 символов'});
    }
    if (this.password.length === 0) {
      this.messageService.add({severity: 'error', summary: 'Введите логин'});
    }
    if (this.password.length === 0) {
      this.messageService.add({severity: 'error', summary: 'Введите пароль'});
    }
  }
}
