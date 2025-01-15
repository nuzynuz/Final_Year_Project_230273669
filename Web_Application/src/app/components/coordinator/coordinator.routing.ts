import { NgModule } from "@angular/core";
import { RouterModule,Route } from "@angular/router";
import { ViewAccountComponent } from "../manager/user-accounts/view-account/view-account.component";
import { AdvanceListComponent } from "./advance-list/advance-list.component";
import { AgentListComponent } from "./agent-list/agent-list.component";
import { CoordinatorDashboardComponent } from "./coordinator-dashboard/coordinator-dashboard.component";
import { FarmersListComponent } from "./farmers-list/farmers-list.component";

export const coordinatorRoutes: Route[] = [
    { path :'', redirectTo:'dashboard', pathMatch:'full' },
    { path : 'dashboard', component: CoordinatorDashboardComponent},
    { path : 'farmers', component: FarmersListComponent},
    { path : 'agents', component: AgentListComponent},
    { path : 'view-account/:id', component: ViewAccountComponent},
    { path : 'advances', component: AdvanceListComponent},
];
@NgModule({
    imports:[RouterModule.forChild(coordinatorRoutes)],
    exports:[RouterModule]
})
export class coordinatorRoutingModule{

}