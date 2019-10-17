import { Observable, of } from 'rxjs';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule, Injectable } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadingStrategy,
  Route
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'user',
    loadChildren: 'src/app/user/user.module'
  },
  {
    path: 'home',
    loadChildren: 'src/app/home/home.module',
    data: {
      preload: true
    }
  }
];

@Injectable({ providedIn: 'root' })
class AppCustomStrategy extends PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) {
      return load();
    } else {
      return of(null);
    }
  }
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: AppCustomStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
