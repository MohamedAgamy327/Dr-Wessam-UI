import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/_services';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-patient-add-dialog',
  templateUrl: './patient-add-dialog.component.html',
  styleUrls: ['./patient-add-dialog.component.css']
})

export class PatientAddDialogComponent {

  addForm: FormGroup;
  panelOpenState = false;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<PatientAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private repository: RepositoryService, private snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      code: [],
      name: [''],
      maritalStatus: ['Single'],
      phone1: [''],
      phone2: [''],
      occupationId: [],
      birthday: [],
      knowingId: [],
      residence: [''],
      husbandName: [''],
      husbandOccupationId: [],
      husbandBirthday: [],
      husbandPhone: [''],
      bloodGroup: [''],
      bmi: [''],
      children: [''],
      weight: [''],
      smoking: ['']
    }
    );
  }

  public errorHandling = (control: string, error: string) => {
    return this.addForm.controls[control].hasError(error);
  }

  save() {
    this.repository.post('patients', this.addForm.value).subscribe(
      (res: any) => {
        this.snackBar.open('Added Successfully', '', {
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
