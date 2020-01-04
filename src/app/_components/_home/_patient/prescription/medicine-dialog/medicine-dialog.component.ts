import { Component, Inject,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/_services';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Medicine, MedicineType, Frequency } from 'src/app/_models';

@Component({
  selector: 'app-medicine-dialog',
  templateUrl: './medicine-dialog.component.html',
  styleUrls: ['./medicine-dialog.component.css']
})
export class MedicineDialogComponent implements OnInit {
 medicines: Medicine[];
  medicineTypes: MedicineType[];
  frequencys: Frequency[];
   addMedcineForm: FormGroup;
   medicineChoosed:any;
    constructor( private formBuilder: FormBuilder,private dialogRef: MatDialogRef<MedicineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private repository: RepositoryService, private snackBar: MatSnackBar) {
  this.medicineChoosed={frequencyId:"",}
  }

   ngOnInit() {
    this.getMedicines();
    this.getFrequencys();
    this.getMedicineTypes();
    this.addMedcineForm=this.formBuilder.group({
      id:[],
      medicine:['',Validators.required],
      medicineId:[''],
      medicineTypeId:['',Validators.required],
      patientId:[this.data.PatientId],
      frequencyId:['',Validators.required],
      duration:['',Validators.required],
      noteAr:[],
      noteEng:[],
 
  });
   }

  getMedicines() {
    this.repository.get('medicines').subscribe(
      (res: any) => {
        this.medicines = res;
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }

  getFrequencys() {
    this.repository.get('frequencys').subscribe(
      (res: any) => {
        this.frequencys = res;
        console.log(res)
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }

  getMedicineTypes() {
    this.repository.get('medicineTypes').subscribe(
      (res: any) => {
        this.medicineTypes = res;
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }
chooseMedicineChange()
{
  let choosed=this.addMedcineForm.controls.medicine.value;
if (choosed) {
  console.log(choosed)

  this.addMedcineForm.controls.medicineId.setValue(choosed.id);
this.addMedcineForm.controls.frequencyId.setValue(choosed.frequencyId);
this.addMedcineForm.controls.medicineTypeId.setValue(choosed.medicineTypeId);

this.addMedcineForm.controls.duration.setValue(choosed.duration);
}

}

  public hasError = (controlName: string, errorName: string) => {
    return this.addMedcineForm.controls[controlName].hasError(errorName);
  };

  onCancelClick(event): void {
    event.preventDefault();
    this.dialogRef.close();
  }


 

}
