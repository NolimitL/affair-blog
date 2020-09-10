import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AuthGuard } from './shared/services/auth.guard';
import { SearchPipe } from './shared/search.pipe';
import { AlertService } from './shared/services/alert.service';

const routesAdminPage: Routes = [
  {
    path:'', component:AdminLayoutComponent, children:[
      {path: '', redirectTo:'/admin/login', pathMatch:'full'},
      {path:'login', component:LoginPageComponent},
      {path:'dashboard', component:DashboardPageComponent, canActivate:[AuthGuard]},
      {path:'create', component:CreatePageComponent, canActivate:[AuthGuard]},
      {path:'post/:id/edit', component:EditPageComponent, canActivate:[AuthGuard]}
    ]
  }
]

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    CreatePageComponent,
    SearchPipe,
    AlertComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routesAdminPage)
  ],
  exports:[
    RouterModule
  ],
  providers:[
    AuthGuard,
    AlertService
  ]
})
export class AdminModule{

}
