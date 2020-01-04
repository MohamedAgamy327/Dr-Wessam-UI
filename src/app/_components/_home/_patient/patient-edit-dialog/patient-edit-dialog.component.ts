import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RepositoryService } from 'src/app/_services';

@Component({
  selector: 'app-patient-edit-dialog',
  templateUrl: './patient-edit-dialog.component.html',
  styleUrls: ['./patient-edit-dialog.component.css']
})

export class PatientEditDialogComponent {

  editForm: FormGroup;
  panelOpenState = false;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<PatientEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private repository: RepositoryService, private snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      id: [this.data.patient.id],
      name: [this.data.patient.name, Validators.required],
      code: [this.data.patient.code],
      maritalStatus: [this.data.patient.maritalStatus],
      phone1: [this.data.patient.phone1],
      phone2: [this.data.patient.phone2],
      occupationId: [this.data.patient.occupationId],
      birthday: [this.data.patient.birthday],
      knowingId: [this.data.patient.knowingId],
      residence: [this.data.patient.residence],
      husbandName: [this.data.patient.husbandName],
      husbandOccupationId: [this.data.patient.husbandOccupationId],
      husbandBirthday: [this.data.patient.husbandBirthday],
      husbandPhone: [this.data.patient.husbandPhone],
      bloodGroup: [this.data.patient.bloodGroup],
      bmi: [this.data.patient.bmi],
      children: [this.data.patient.children],
      weight: [this.data.patient.weight],
      smoking: [this.data.patient.smoking]
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.editForm.controls[control].hasError(error);
  }

  update() {
    this.repository.put('patients', this.editForm.value).subscribe(
      (res: any) => {
        this.snackBar.open('Edited Successfully', '', {
          duration: 1000,
          panelClass: ['green-snackbar']
        });
        this.dialogRef.close(res);
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
