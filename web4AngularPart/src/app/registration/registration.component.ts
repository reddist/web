import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email: string;
  username: string;
  password: string;

  constructor(private authService: AuthService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  register(authForm) {
    if ((this.email === null || this.email === '' || this.email === undefined) ||
        (this.username === null || this.username === '' || this.username === undefined) ||
        (this.password === null || this.password === '' || this.password === undefined)) {
      this.messageService.add({severity: 'warn', summary: 'Для регистрации заполните все поля'});
      return;
    }
    if (authForm.valid) {
      this.authService.register({
        email: this.email,
        login: this.username,
        password: this.password
      }).subscribe((result: any) => {
        if (result.result === 'success') {
          document.getElementById('shadow').click();
          this.messageService.add({severity: 'success', summary: 'Пользователь ' + this.username + ' успешно зарегистрирован.'});
        } else {
          this.messageService.add({severity: 'error', summary: result.summary});
        }
      }, (error) => {
        if (error.status >= 500 || error.status === 0) {
          this.messageService.add({severity: 'error', summary: 'Ой! Сервер больно упал'});
        }
        // if (error.status <= 400 && error.status >= 300) {
        //   this.messageService.add({severity: 'error', summary: 'Такой пользователь уже существует'});
        // }
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

  showModalWin() {
    // alert('Modal Window!');
    const darkLayer = document.createElement('div');
    darkLayer.id = 'shadow';
    darkLayer.style.position = 'fixed';
    darkLayer.style.width = '100%';
    darkLayer.style.height = '100%';
    darkLayer.style.zIndex = '1';
    darkLayer.style.background = '#000';
    darkLayer.style.opacity = ' 0.7';
    darkLayer.style.left = '0';
    darkLayer.style.top = '0';
    document.body.appendChild(darkLayer);

    const modalWin = document.getElementById('popupWin');
    modalWin.style.display = 'block';

    // tslint:disable-next-line:only-arrow-functions
    darkLayer.onclick = function() {
      darkLayer.parentNode.removeChild(darkLayer);
      modalWin.style.display = 'none';
      return false;
    };
  }

}

