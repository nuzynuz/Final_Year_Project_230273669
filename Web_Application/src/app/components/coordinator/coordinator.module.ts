import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { coordinatorRoutingModule } from "./coordinator.routing";

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
import { CoordinatorDashboardComponent } from "./coordinator-dashboard/coordinator-dashboard.component";
import { FarmersListComponent } from './farmers-list/farmers-list.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { AdvanceListComponent } from './advance-list/advance-list.component';

@NgModule({
    declarations: [
        CoordinatorDashboardComponent,
        FarmersListComponent,
        AgentListComponent,
        AdvanceListComponent,
    ],
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        coordinatorRoutingModule,  
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
export class CoordinatorModule
{
}