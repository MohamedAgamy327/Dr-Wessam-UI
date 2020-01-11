

import { PrescriptionDeleteInstructionDialogComponent } from './../prescription-delete-instruction-dialog/prescription-delete-instruction-dialog.component';
import { PrescriptionDeleteMedicineDialogComponent } from './../prescription-delete-medicine-dialog/prescription-delete-medicine-dialog.component';
import { PrescriptionEditMedicineDialogComponent } from './../prescription-edit-medicine-dialog/prescription-edit-medicine-dialog.component';
import { PrescriptionAddInstructionDialogComponent } from './../prescription-add-instruction-dialog/prescription-add-instruction-dialog.component';
import { PrescriptionAddMedicineDialogComponent } from './../prescription-add-medicine-dialog/prescription-add-medicine-dialog.component';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { RepositoryService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Medicine, MedicineType, Frequency } from 'src/app/_models';

import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Patient, Occupation, Knowing } from 'src/app/_models';
@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit {
patientModel:any;
editPrescriptionForm:FormGroup;
prescriptionMedicines:any[];
prescriptionInstructions:any[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['medcinename', 'type', 'frequency', 'duration','note',  'actions'];
  displayedInstructionsColumns: string[] = ['arabicname', 'englishname', 'actions'];
  visitTypes:any[]=["medicalExamination", "medicalConsultation" , "folllowup"];

  medicines: Medicine[];
  medicineTypes: MedicineType[];
  frequencys: Frequency[];
   dataItem:any={
      diagonsis:"",
      visitDate:"",
      nextVisitDate:"",
      visitType:"",
      patientId:"",
    };

  dataSource = new MatTableDataSource<any>();
  dataSourceInstruction = new MatTableDataSource<any>();
  constructor( private route:ActivatedRoute,private repository: RepositoryService,private formBuilder: FormBuilder,
  private snackBar: MatSnackBar,private router:Router, private dialog: MatDialog)
  {
    this.prescriptionMedicines=[];
    this.prescriptionInstructions=[];
   }

     ngOnInit() {

       this.editPrescriptionForm=this.formBuilder.group({
          diagonsis:[''],
          visitDate:['',Validators.required],
          nextVisitDate:['',Validators.required],
          visitType:['',Validators.required],
    });
   let prescriptionId= parseInt(this.route.snapshot.paramMap.get('id'));
   if (prescriptionId!==undefined) {
     this.getPrescriptionIdById(prescriptionId);
   }
      this.getFrequencys();
    this.getMedicines();
      }



  getPrescriptionIdById(Id:number) {
    this.repository.getById('Prescriptions',Id).subscribe(
      (res: any) => {
      this.dataItem=res;
console.log(res);
      this.prescriptionMedicines=res.prescriptionMedicines,
          this.prescriptionInstructions=res.prescriptionMedicines,
       this.editPrescriptionForm=this.formBuilder.group({
          diagonsis:[res.diagonsis],
          visitDate:[res.visitDate,Validators.required],
          nextVisitDate:[res.nextVisitDate,Validators.required],
          visitType:[res.visitType,Validators.required],
    });

    this.refeshInstructionTable();
    this.refeshMedicineTable();
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }

  getMedicines() {
    this.repository.get('medicines').subscribe(
      (res: any) => {
        console.log(res);
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
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }
addMedicine(){
   const dialogRef = this.dialog.open(PrescriptionAddMedicineDialogComponent, {
      data: {
      operation:"AddMedicine" ,
      PatientId:parseInt(this.route.snapshot.paramMap.get('id'))
      },
         width: "50%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.prescriptionMedicines.push(result);
      this.refeshMedicineTable();
      }
    });
}

editMedicine(medicineItem){
   const dialogRef = this.dialog.open(PrescriptionEditMedicineDialogComponent, {
      data: medicineItem,
         width: "50%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      medicineItem=result;
      this.refeshMedicineTable();
      }
    });
}
deleteMedicine(medicineItem){
   const dialogRef = this.dialog.open(PrescriptionDeleteMedicineDialogComponent, {
      data: medicineItem,
         width: "50%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.refeshMedicineTable();
      }
    });
}


addInstruction(){
   const dialogRef = this.dialog.open(PrescriptionAddInstructionDialogComponent, {
      data: {
      PatientId:parseInt(this.route.snapshot.paramMap.get('id'))
      },
         width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.prescriptionInstructions.push(result);
      console.log(this.prescriptionInstructions);

      this.refeshInstructionTable();


      }
    });
}

deleteInstruction(medicineItem){
   const dialogRef = this.dialog.open(PrescriptionDeleteInstructionDialogComponent ,{
      data: medicineItem,
         width: "50%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
}
onSave(){

  this.dataItem.prescriptionMedicines=this.prescriptionMedicines;
  this.dataItem.prescriptionInstructions=this.prescriptionInstructions;
  console.log(this.dataItem);
    this.repository.put('prescriptions',this.dataItem).subscribe(
      (res: any) => {
          this.snackBar.open("Prescription has been updated successfully", '', {
          duration: 1000,
            panelClass: ['green-snackbar'],
            horizontalPosition: "right"
        });
this.router.navigate(['/home/patientprofile',parseInt(this.route.snapshot.paramMap.get('id'))]);

      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 100000,
          panelClass: ['red-snackbar'],
          horizontalPosition: "right"
        });
      });

}
 fireSnackBar(message: string, action, classType: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [classType],
      horizontalPosition: "right"
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editPrescriptionForm.controls[controlName].hasError(errorName);
  };
   refeshMedicineTable() {
    this.dataSource = new MatTableDataSource(this.prescriptionMedicines);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
   refeshInstructionTable() {
    this.dataSourceInstruction = new MatTableDataSource(this.prescriptionInstructions);
    this.dataSourceInstruction.paginator = this.paginator;
    this.dataSourceInstruction.sort = this.sort;

  }

}
