import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RepositoryService } from 'src/app/_services';

@Component({
  selector: 'app-patient-delete-dialog',
  templateUrl: './patient-delete-dialog.component.html',
  styleUrls: ['./patient-delete-dialog.component.css']
})

export class PatientDeleteDialogComponent {
  panelOpenState = false;

  constructor(private dialogRef: MatDialogRef<PatientDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private repository: RepositoryService, private snackBar: MatSnackBar) { }

  cancel(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.repository.delete(`patients/${this.data.id}`).subscribe(
      (res: any) => {
        this.snackBar.open('Deleted Successfully', '', {
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

}
