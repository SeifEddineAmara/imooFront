import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'advertising',
    loadChildren: () =>
      import('./advertising/advertising.module').then((m) => m.AdvertisingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
