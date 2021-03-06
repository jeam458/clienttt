import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProfileComponent} from './components/profile/profile.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { DetallepaqueteComponent} from './components/detallepaquete/detallepaquete.component';
import { CatalogoComponent} from './components/catalogo/catalogo.component';
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/notauth.guard';
const appRoutes:Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'relacionados/:id',
        component:CatalogoComponent
    },
    {
        path:'detallepaquete/:id',
        component: DetallepaqueteComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'profile',
        component:ProfileComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'login',
        component:LoginComponent,
        canActivate:[NotAuthGuard]
    },
    {
        path:'register',
        component:RegisterComponent,
        canActivate:[NotAuthGuard]
    },
    {
        path:'**',
        component:HomeComponent
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports:[RouterModule]
  })
  export class AppRoutingModule { }
  