import { RepositoryService } from 'src/app/_services';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
@Component({
  selector: 'app-prescription-delete-instruction-dialog',
  templateUrl: './prescription-delete-instruction-dialog.component.html',
  styleUrls: ['./prescription-delete-instruction-dialog.component.css']
})
export class PrescriptionDeleteInstructionDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PrescriptionDeleteInstructionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

               }

  ngOnInit() {
  }

   cancel(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {

        this.dialogRef.close(this.data);


  }

}
