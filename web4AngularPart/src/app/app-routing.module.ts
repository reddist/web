import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {MainpageComponent} from './mainpage/mainpage.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {NotAuthorizedComponent} from './not-found/not-authorized/not-authorized.component';
import {NotFoundComponent} from './not-found/not-found.component';


const routes: Routes = [
  { path: 'mainpage', canActivate: [AuthGuard], component: MainpageComponent },
  { path: 'welcome', component: WelcomeComponent},
  { path: 'unauthorized', component: NotAuthorizedComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
