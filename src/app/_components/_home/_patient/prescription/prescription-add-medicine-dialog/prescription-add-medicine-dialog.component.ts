import { Component, Inject,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/_services';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Medicine, MedicineType, Frequency } from 'src/app/_models';

@Component({
  selector: 'app-prescription-add-medicine-dialog',
  templateUrl: './prescription-add-medicine-dialog.component.html',
  styleUrls: ['./prescription-add-medicine-dialog.component.css']
})
export class PrescriptionAddMedicineDialogComponent implements OnInit {

 medicines: Medicine[];
  medicineTypes: MedicineType[];
  frequencys: Frequency[];
   addMedcineForm: FormGroup;
   medicineChoosed:any;
   dataItem:any={
     medicineId:"",name:"",medicineTypeId:"",
     medicineType:"",frequencyId:""
     ,frequency:"",duration:"",
     noteAr:"",noteEng:""
   }
    constructor( private formBuilder: FormBuilder,private dialogRef: MatDialogRef<PrescriptionAddMedicineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private repository: RepositoryService, private snackBar: MatSnackBar) {
  this.medicineChoosed={frequencyId:"",medicineTypeId:""}
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
      noteAr:[""],
      noteEng:[""],
 
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
        console.log(res);
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }
chooseMedicineChange(){
      let choosed=this.addMedcineForm.controls.medicine.value;
      if (choosed) {
         
          this.dataItem.medicineId=choosed.id;
          this.dataItem.name=choosed.name;
          this.dataItem.medicineTypeId=choosed.medicineTypeId;
          this.dataItem.medicineType=choosed.medicineType;
          this.dataItem.frequency=choosed.frequency;
          this.dataItem.frequencyId=choosed.frequencyId;
          this.dataItem.duration=choosed.duration;

   
}

}

  public hasError = (controlName: string, errorName: string) => {
    return this.addMedcineForm.controls[controlName].hasError(errorName);
  };

  onCancelClick(event): void {
    event.preventDefault();
    this.dialogRef.close();
  }
  onSave(){
    this.dialogRef.close(this.dataItem);

  }


 

}
