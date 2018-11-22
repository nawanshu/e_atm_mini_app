import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { DepositComponent} from './deposit/deposit.component';
import { AppRoutingGuard } from './home/app-routing.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'input', component: InputComponent },
    { path: 'deposit', component: DepositComponent, canActivate: [AppRoutingGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
