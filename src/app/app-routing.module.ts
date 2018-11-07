import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: '',
        component: ListComponent,
        pathMatch: 'full'
      },
      {
        path: 'edit',
        component: EditComponent,
      }
    ]
  },
  {
    path: 'login', component: LoginComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'login' }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: false })]
})
export class AppRoutingModule { }
