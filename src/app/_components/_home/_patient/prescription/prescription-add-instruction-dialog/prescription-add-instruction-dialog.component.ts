import { Component, Inject,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/_services';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-prescription-add-instruction-dialog',
  templateUrl: './prescription-add-instruction-dialog.component.html',
  styleUrls: ['./prescription-add-instruction-dialog.component.css']
})
export class PrescriptionAddInstructionDialogComponent implements OnInit {
addInstructionForm:FormGroup;
dataItem:any={}
 instructions: any[];
      constructor( private formBuilder: FormBuilder,private dialogRef: MatDialogRef<PrescriptionAddInstructionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private repository: RepositoryService, private snackBar: MatSnackBar) {
  }



  ngOnInit() {
    this.getInstructions();

    this.addInstructionForm=this.formBuilder.group({
   instruction:["",Validators.required]


    })
  }
    getInstructions() {
    this.repository.get('instructions').subscribe(
      (res: any) => {
        this.instructions = res;
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.addInstructionForm.controls[controlName].hasError(errorName);
  };

  onCancelClick(event): void {
    event.preventDefault();
    this.dialogRef.close();
  }
  onSave(){
    this.dialogRef.close(this.dataItem);

  }
}
