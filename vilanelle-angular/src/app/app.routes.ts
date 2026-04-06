import { Routes } from '@angular/router';
import { HomePageComponent } from './visitor/home/home.page.component';
import { LoginPageComponent } from './visitor/login/login.page.component';
import { AboutPageComponent } from './visitor/about/about.page.component';
import { AgendaPageComponent } from './visitor/agenda/agenda.page.component';
import { JoiningPageComponent } from './visitor/joining/joining.page.component';
import { ScoresPageComponent } from './user/scores/scores.page.component';
import { authGuard } from './guard/auth-guard';
import { PicturesPageComponent } from './user/pictures/pictures.page.component';
import { AdminAgendaPageComponent } from './user/admin-agenda/admin-agenda.page.component';
import { adminGuard } from './guard/admin-guard';
import { AdminScoresPageComponent } from './user/admin-scores/admin-scores.page.component';
import { HistoryPageComponent } from './visitor/history/history.page.component';
import { AdminCalendarPageComponent } from './user/admin-calendar/admin-calendar.page.component';
import { UserCalendarPageComponent } from './user/user-calendar/user-calendar.page.component';

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
        path: 'history',
        component: HistoryPageComponent,
        title: 'history'
    },
    {
        path: 'scores',
        component: ScoresPageComponent,
        title: 'scores',
        canActivate: [authGuard]
    },
    {
        path: 'admin-scores',
        component: AdminScoresPageComponent,
        title: 'admin-scores',
        canActivate: [adminGuard]
    },
    {
        path: 'user-calendar',
        component: UserCalendarPageComponent,
        title: 'user-calendar',
        canActivate: [authGuard]
    },
    {
        path: 'admin-calendar',
        component: AdminCalendarPageComponent,
        title: 'admin-calendar',
        canActivate: [adminGuard]
    },
    {
        path: 'pictures',
        component: PicturesPageComponent,
        title: 'pictures',
        canActivate: [authGuard]
    },
    {
        path: 'admin-agenda',
        component: AdminAgendaPageComponent,
        title: 'admin-agenda',
        canActivate: [adminGuard]
    }
];
