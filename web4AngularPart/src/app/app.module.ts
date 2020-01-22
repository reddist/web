import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {PasswordModule} from 'primeng/password';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SliderModule} from 'primeng/slider';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './welcome/welcome.component';
import {RegistrationComponent} from './registration/registration.component';
import {MainpageComponent} from './mainpage/mainpage.component';
import {CanvasComponent} from './canvas/canvas.component';
import {TableComponent} from './table/table.component';
import {CoordinatesComponent} from './coordinates/coordinates.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {BooleanToText} from './pipes/boolean-to-text.pipe';
import {NotAuthorizedComponent} from './not-found/not-authorized/not-authorized.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PointService} from './services/point.service';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AuthService} from './services/auth.service';
import {MessageService} from 'primeng/api';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { SmoothScrollToDirective, SmoothScrollDirective } from './ng2-SmoothScroll.directive';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RegistrationComponent,
    MainpageComponent,
    CanvasComponent,
    TableComponent,
    CoordinatesComponent,
    NotFoundComponent,
    BooleanToText,
    NotAuthorizedComponent,
    SmoothScrollToDirective,
    SmoothScrollDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    RadioButtonModule,
    SliderModule,
    PasswordModule,
    HttpClientModule,
    ToastModule,
    TableModule,
    CheckboxModule,
    ScrollingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    PointService,
    AuthService,
    MessageService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
