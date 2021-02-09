import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {LoginPageComponent} from './login-page/login-page.component'
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component'
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component'
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {OutlayPageComponent} from "./outlay-page/outlay-page.component";
import {IncomePageComponent} from "./income-page/income-page.component";
import {SettingLayoutComponent} from "./shared/layouts/setting-layout/setting-layout.component";
import {PositionPageComponent} from "./position-page/position-page.component";
import {FamilyPageComponent} from "./family-page/family-page.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'outlay', component: OutlayPageComponent},
      {path: 'income', component: IncomePageComponent},
      {path: 'setting', component: SettingLayoutComponent, children: [
          {path: '', redirectTo: 'position', pathMatch: 'full'},
          {path:'position', component: PositionPageComponent},
          {path:'family', component: FamilyPageComponent}
        ]}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
