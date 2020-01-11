import { PrescriptionAddComponent } from './_patient/patient-profile/view-all-prescriptions/prescription-add/prescription-add.component';
import { PrescriptionEditComponent } from './_patient/patient-profile/view-all-prescriptions/prescription-edit/prescription-edit.component';
import { PatientProfileComponent } from './_patient/patient-profile/patient-profile.component';
import { PrescriptionComponent } from './_patient/prescription/prescription.component';
import { PregnancySequenceComponent } from './_patient/patient-profile/pregnancy-sequence/pregnancy-sequence.component';
import { InfertilitySheetComponent } from './_patient/patient-profile/infertility-sheet/infertility-sheet.component';
import { ViewAllPrescriptionsComponent } from './_patient/patient-profile/view-all-prescriptions/view-all-prescriptions.component';
import { AttachedFilesComponent } from './_patient/patient-profile/attached-files/attached-files.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HomeComponent, LandingComponent, KnowingsComponent,
  MedicineTypesComponent, OccupationsComponent, FrequencysComponent,
  InstructionsComponent, PatientsComponent, MedicinesComponent
} from '.';

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
        { path: 'addprescription/:id', component: PrescriptionAddComponent},
        { path: 'editprescription/:id', component: PrescriptionEditComponent},

        { path: 'patientprofile/:id', component: PatientProfileComponent,
            children:[
           { path: '', redirectTo: 'prescriptions', pathMatch: 'full' },
           { path: 'prescriptions', component:ViewAllPrescriptionsComponent },
           { path: 'infertilitysheet', component: InfertilitySheetComponent},
           { path: 'pregnancysequence', component: PregnancySequenceComponent},
           { path: 'attachfiles', component: AttachedFilesComponent},
        ]
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
