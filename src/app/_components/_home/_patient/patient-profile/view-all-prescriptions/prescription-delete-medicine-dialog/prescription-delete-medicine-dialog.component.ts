import { RepositoryService } from 'src/app/_services';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-prescription-delete-medicine-dialog',
  templateUrl: './prescription-delete-medicine-dialog.component.html',
  styleUrls: ['./prescription-delete-medicine-dialog.component.css']
})
export class PrescriptionDeleteMedicineDialogComponent  {

  constructor(private dialogRef: MatDialogRef<PrescriptionDeleteMedicineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private repository: RepositoryService, private snackBar: MatSnackBar) { }

  cancel(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {

        this.dialogRef.close(this.data);


  }

}
