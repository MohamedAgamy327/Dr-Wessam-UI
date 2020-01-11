import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RepositoryService } from 'src/app/_services';
import { Medicine, MedicineType, Frequency } from 'src/app/_models';
@Component({
  selector: 'app-prescription-edit-medicine-dialog',
  templateUrl: './prescription-edit-medicine-dialog.component.html',
  styleUrls: ['./prescription-edit-medicine-dialog.component.css']
})
export class PrescriptionEditMedicineDialogComponent  {

  editForm: FormGroup;
 medicines: Medicine[];
  medicineTypes: MedicineType[];
  frequencys: Frequency[];
   editMedcineForm: FormGroup;
   medicineChoosed:any;
   dataItem:any;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<PrescriptionEditMedicineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private repository: RepositoryService, private snackBar: MatSnackBar)
               {
                      this.dataItem=this.data.medicine;
                      console.log(this.dataItem);
                      debugger;
  this.medicineChoosed={
    frequencyId:this.data.medicine.frequencyId,
  medicineTypeId:this.data.medicine.medicineTypeId}
  }

   ngOnInit() {

     this.frequencys = this.data.frequencys;
     this.medicineTypes=this.data.medicineTypes
    this.editMedcineForm=this.formBuilder.group({
      medicine:[this.data.medicine,Validators.required],
      medicineId:[this.data.medicine.medicineId],
      medicineTypeId:[this.data.medicine.medicineTypeId,Validators.required],
      frequencyId:[this.data.medicine.frequencyId,Validators.required],
      duration:[this.data.medicine.duration,Validators.required],
      noteAr:[this.data.medicine.noteAr],
      noteEng:[this.data.medicine.noteEng],

  });
   }

  public hasError = (controlName: string, errorName: string) => {
    debugger;
    return this.editMedcineForm.controls[controlName].hasError(errorName);
  };

  onCancelClick(event): void {
    event.preventDefault();
    this.dialogRef.close();
  }
  onSave(){
    this.dialogRef.close(this.editMedcineForm.controls.medicine.value);

  }




}
