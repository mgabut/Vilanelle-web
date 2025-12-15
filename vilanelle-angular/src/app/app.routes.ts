import { Routes } from '@angular/router';
import { HomePageComponent } from './visitor/home/home.page.component';
import { LoginPageComponent } from './visitor/login/login.page.component';
import { AboutPageComponent } from './visitor/about/about.page.component';
import { AgendaPageComponent } from './visitor/agenda/agenda.page.component';
import { JoiningPageComponent } from './visitor/joining/joining.page.component';
import { ScoresPageComponent } from './user/scores/scores.page.component';
import { authGuard } from './guard/auth-guard';
import { PicturesPageComponent } from './user/pictures/pictures.page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        title: 'home'
    },
    {
        path: 'login',
        component: LoginPageComponent,
        title: 'login'
    },
    {
        path: 'about',
        component: AboutPageComponent,
        title: 'about'
    },
    {
        path: 'agenda',
        component: AgendaPageComponent,
        title: 'agenda'
    },
    {
        path: 'joining',
        component: JoiningPageComponent,
        title: 'joining'
    },
    {
        path: 'scores',
        component: ScoresPageComponent,
        title: 'scores',
        canActivate: [authGuard]
    },
    {
        path: 'pictures',
        component: PicturesPageComponent,
        title: 'pictures',
        canActivate: [authGuard]
    }
];
