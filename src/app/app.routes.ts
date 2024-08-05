import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountsComponent } from './accounts/accounts.component';
export const routes: Routes = [
  {
    path: '',
    title: 'TCSA | Home Page ',
    component: HomeComponent,
  },
  {
    path: 'accounts/:id',
    title: `TCSA | Accounts`,
    component: AccountsComponent,
  },
];
