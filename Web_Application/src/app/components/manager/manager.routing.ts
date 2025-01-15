import { NgModule } from "@angular/core";
import { RouterModule,Route } from "@angular/router";
import { ManagerDashboardComponent } from "./manager-dashboard/manager-dashboard.component";
import { RegionsComponent } from "./regions/regions.component";
import { UserAccountsComponent } from "./user-accounts/user-accounts.component";
import { ViewAccountComponent } from "./user-accounts/view-account/view-account.component";
import { WeightagesComponent } from "./weightages/weightages.component";

export const managerRoutes: Route[] = [
    { path :'', redirectTo:'dashboard', pathMatch:'full' },
    { path : 'dashboard', component: ManagerDashboardComponent},
    { path : 'user-accounts', component: UserAccountsComponent},
    { path : 'view-account/:id', component: ViewAccountComponent},
    { path : 'regions', component: RegionsComponent},
    { path : 'weightages', component: WeightagesComponent},
    // { path: 'add', component: AddBookComponent},
    // { path: 'edit/:id', component: EditBooksComponent}
];
@NgModule({
    imports:[RouterModule.forChild(managerRoutes)],
    exports:[RouterModule]
})
export class managerRoutingModule{

}