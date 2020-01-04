import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HomeComponent, LandingComponent, KnowingsComponent,
  MedicineTypesComponent, OccupationsComponent, FrequencysComponent,
  InstructionsComponent, PatientsComponent, MedicinesComponent
} from '.';
import { PrescriptionComponent } from './_patient/prescription/prescription.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: '', component: LandingComponent
      },
      {
        path: 'knowings', component: KnowingsComponent
      },
      {
        path: 'medicinetypes', component: MedicineTypesComponent
      },
      {
        path: 'medicines', component: MedicinesComponent
      },
      {
        path: 'occupations', component: OccupationsComponent
      },
      {
        path: 'frequencys', component: FrequencysComponent
      },
      {
        path: 'instructions', component: InstructionsComponent
      },
      {
        path: 'patients', component: PatientsComponent
      },
       {
        path: 'prescription/:id', component: PrescriptionComponent
      },
      {
        path: '', redirectTo: '', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
