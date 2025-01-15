import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { managerRoutingModule } from "./manager.routing";

import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import { ViewAccountComponent } from './user-accounts/view-account/view-account.component';
import { ManagerDashboardComponent } from "./manager-dashboard/manager-dashboard.component";

import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSortModule } from "@angular/material/sort";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegionsComponent } from './regions/regions.component';
import { WeightagesComponent } from './weightages/weightages.component';

@NgModule({
    declarations: [
        ManagerDashboardComponent,
        UserAccountsComponent,
        ViewAccountComponent,
        RegionsComponent,
        WeightagesComponent
    ],
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        managerRoutingModule,  
        MatStepperModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        NgxMatSelectSearchModule,
        MatAutocompleteModule,
        NgbModule,
        NgxPaginationModule
    ],
    exports:[ 
    ]
})
export class ManagerModule
{
}