import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/_services';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-medicine-add-dialog',
  templateUrl: './medicine-add-dialog.component.html',
  styleUrls: ['./medicine-add-dialog.component.css']
})

export class MedicineAddDialogComponent {

  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<MedicineAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private repository: RepositoryService, private snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      name: [''],
      medicineTypeId: [],
      duration: [],
      frequencyId: [],
      notes: ['']
    }
    );
  }

  public errorHandling = (control: string, error: string) => {
    return this.addForm.controls[control].hasError(error);
  }

  save() {
    this.repository.post('medicines', this.addForm.value).subscribe(
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
