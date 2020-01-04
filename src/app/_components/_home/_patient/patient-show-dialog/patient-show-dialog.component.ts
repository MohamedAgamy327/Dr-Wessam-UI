import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-patient-show-dialog',
  templateUrl: './patient-show-dialog.component.html',
  styleUrls: ['./patient-show-dialog.component.css']
})

export class PatientShowDialogComponent {
  panelOpenState = false;
  constructor(private dialogRef: MatDialogRef<PatientShowDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  cancel(): void {
    this.dialogRef.close();
  }


}
