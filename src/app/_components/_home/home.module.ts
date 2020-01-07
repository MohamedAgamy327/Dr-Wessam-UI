import { PregnancySequenceComponent } from './_patient/patient-profile/pregnancy-sequence/pregnancy-sequence.component';
import { InfertilitySheetComponent } from './_patient/patient-profile/infertility-sheet/infertility-sheet.component';
import { ViewAllPrescriptionsComponent } from './_patient/patient-profile/view-all-prescriptions/view-all-prescriptions.component';
import { AttachedFilesComponent } from './_patient/patient-profile/attached-files/attached-files.component';
import { AngularMaterialModule } from 'src/app/shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSpacePipe } from 'src/app/_custom-pipes/add-space.pipe';
import { CredentialService } from 'src/app/_services';
import {
  HomeComponent, LandingComponent,
  KnowingAddDialogComponent, KnowingDeleteDialogComponent, KnowingEditDialogComponent, KnowingsComponent,
  OccupationAddDialogComponent, OccupationDeleteDialogComponent, OccupationEditDialogComponent, OccupationsComponent,
  MedicineTypeAddDialogComponent, MedicineTypeDeleteDialogComponent,
  MedicineTypeEditDialogComponent, MedicineTypesComponent, FrequencysComponent,
  FrequencyAddDialogComponent, FrequencyEditDialogComponent,
  FrequencyDeleteDialogComponent, InstructionsComponent, InstructionAddDialogComponent,
  InstructionEditDialogComponent, InstructionDeleteDialogComponent,
  PatientsComponent, PatientAddDialogComponent, PatientShowDialogComponent,
  PatientEditDialogComponent, PatientDeleteDialogComponent,
   MedicinesComponent, MedicineAddDialogComponent, MedicineEditDialogComponent, MedicineDeleteDialogComponent
} from '.';
import { OnlyNumber } from 'src/app/_helpers';
import { PrescriptionComponent } from './_patient/prescription/prescription.component';

import { PrescriptionAddMedicineDialogComponent } from './_patient/prescription/prescription-add-medicine-dialog/prescription-add-medicine-dialog.component';
import { PrescriptionAddInstructionDialogComponent } from './_patient/prescription/prescription-add-instruction-dialog/prescription-add-instruction-dialog.component';
import { PatientProfileComponent } from './_patient/patient-profile/patient-profile.component';

@NgModule({
  declarations: [
    AddSpacePipe,
    OnlyNumber,
    HomeComponent,
    LandingComponent,
    KnowingAddDialogComponent, KnowingDeleteDialogComponent, KnowingEditDialogComponent, KnowingsComponent,
    OccupationAddDialogComponent, OccupationDeleteDialogComponent, OccupationEditDialogComponent, OccupationsComponent,
    MedicineTypeAddDialogComponent, MedicineTypeDeleteDialogComponent,
    MedicineTypeEditDialogComponent, MedicineTypesComponent, FrequencysComponent,
    FrequencyAddDialogComponent, FrequencyEditDialogComponent, FrequencyDeleteDialogComponent,
    InstructionsComponent, InstructionAddDialogComponent, InstructionEditDialogComponent,
    InstructionDeleteDialogComponent,
    PatientsComponent, PatientAddDialogComponent, PatientShowDialogComponent,
    PatientEditDialogComponent, PatientDeleteDialogComponent,
    MedicinesComponent, MedicineAddDialogComponent, MedicineEditDialogComponent, MedicineDeleteDialogComponent,
     PrescriptionComponent, PrescriptionAddMedicineDialogComponent, PrescriptionAddInstructionDialogComponent,
      ViewAllPrescriptionsComponent, PatientProfileComponent, InfertilitySheetComponent, PregnancySequenceComponent,
       AttachedFilesComponent
  ],
  entryComponents: [
    KnowingAddDialogComponent, KnowingDeleteDialogComponent, KnowingEditDialogComponent,
    OccupationAddDialogComponent, OccupationDeleteDialogComponent, OccupationEditDialogComponent,
    MedicineTypeAddDialogComponent, MedicineTypeDeleteDialogComponent, MedicineTypeEditDialogComponent,
    FrequencyAddDialogComponent, FrequencyEditDialogComponent, FrequencyDeleteDialogComponent,
    InstructionAddDialogComponent, InstructionEditDialogComponent, InstructionDeleteDialogComponent,
    PatientAddDialogComponent, PatientShowDialogComponent,
    PatientEditDialogComponent, PatientDeleteDialogComponent,
    MedicineAddDialogComponent, MedicineEditDialogComponent, MedicineDeleteDialogComponent
    ,PrescriptionAddMedicineDialogComponent,PrescriptionAddInstructionDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: [CredentialService]
})

export class HomeModule { }
