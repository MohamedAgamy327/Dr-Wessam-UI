import { PrescriptionAddComponent } from './_patient/patient-profile/view-all-prescriptions/prescription-add/prescription-add.component';
import { PrescriptionEditComponent } from './_patient/patient-profile/view-all-prescriptions/prescription-edit/prescription-edit.component';
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

import { PrescriptionAddMedicineDialogComponent } from './_patient/patient-profile/view-all-prescriptions/prescription-add-medicine-dialog/prescription-add-medicine-dialog.component';
import { PrescriptionAddInstructionDialogComponent } from './_patient/patient-profile/view-all-prescriptions/prescription-add-instruction-dialog/prescription-add-instruction-dialog.component';
import { PatientProfileComponent } from './_patient/patient-profile/patient-profile.component';
import { PrescriptionDeleteInstructionDialogComponent } from './_patient/patient-profile/view-all-prescriptions/prescription-delete-instruction-dialog/prescription-delete-instruction-dialog.component';
import { PrescriptionShowInstructionDialogComponent } from './_patient/patient-profile/view-all-prescriptions/prescription-show-instruction-dialog/prescription-show-instruction-dialog.component';
import { PrescriptionEditMedicineDialogComponent } from './_patient/patient-profile/view-all-prescriptions/prescription-edit-medicine-dialog/prescription-edit-medicine-dialog.component';
import { PrescriptionDeleteMedicineDialogComponent } from './_patient/patient-profile/view-all-prescriptions/prescription-delete-medicine-dialog/prescription-delete-medicine-dialog.component';
import { PrescriptionDeleteDialogComponent } from './_patient/patient-profile/view-all-prescriptions/prescription-delete-dialog/prescription-delete-dialog.component';
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
   PrescriptionAddMedicineDialogComponent, PrescriptionAddInstructionDialogComponent,
      ViewAllPrescriptionsComponent, PatientProfileComponent, InfertilitySheetComponent, PregnancySequenceComponent,
       AttachedFilesComponent,
       PrescriptionDeleteInstructionDialogComponent,
       PrescriptionShowInstructionDialogComponent,
       PrescriptionEditMedicineDialogComponent,
       PrescriptionDeleteMedicineDialogComponent,
       PrescriptionEditComponent,
       PrescriptionAddComponent,
       PrescriptionDeleteDialogComponent
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
    ,PrescriptionAddMedicineDialogComponent,PrescriptionAddInstructionDialogComponent,
    PrescriptionDeleteInstructionDialogComponent,PrescriptionDeleteDialogComponent,
PrescriptionShowInstructionDialogComponent,PrescriptionEditMedicineDialogComponent,
PrescriptionDeleteMedicineDialogComponent

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
