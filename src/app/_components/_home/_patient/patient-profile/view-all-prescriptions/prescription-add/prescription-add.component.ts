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
  selector: 'app-prescription-add',
  templateUrl: './prescription-add.component.html',
  styleUrls: ['./prescription-add.component.css']
})
export class PrescriptionAddComponent implements OnInit {
patientModel:any;
addPrescriptionForm:FormGroup;
prescriptionMedicines:any[];
prescriptionInstructions:any[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['medcinename', 'type', 'frequency', 'duration','note',  'actions'];
  displayedInstructionsColumns: string[] = ['arabicname', 'englishname', 'actions'];
  medicines: Medicine[];
  medicineTypes: MedicineType[];
  frequencys: Frequency[];
   dataItem:any={
      diagonsis:"",
      visitDate:"",
      nextVisitDate:"",
      visitType:"",
      patientId:"",
      prescriptionMedicines:[],
      prescriptionInstructions:[],
    };

visitTypes:any[]=["medicalExamination", "medicalConsultation" , "folllowup"];
  dataSource = new MatTableDataSource<any>();
  dataSourceInstruction = new MatTableDataSource<any>();
  constructor( private route:ActivatedRoute,private repository: RepositoryService,private formBuilder: FormBuilder,
  private snackBar: MatSnackBar,private router:Router, private dialog: MatDialog)
  {
    this.prescriptionMedicines=[];
    this.prescriptionInstructions=[];

   }

     ngOnInit() {
    this.addPrescriptionForm=this.formBuilder.group({
          diagonsis:[""],
          visitDate:["",Validators.required],
          nextVisitDate:["",Validators.required],
          visitType:["",Validators.required],
          prescriptionMedicines:[""],
          prescriptionInstructions:[""],

    });
   let patientId= parseInt(this.route.snapshot.paramMap.get('id'));
   if (patientId!==undefined) {
     this.dataItem.patientId=patientId;
     this.getPatientById(patientId);
   }
      this.getFrequencys();
    this.getMedicines();
      }
  public hasError = (controlName: string, errorName: string) => {
    return this.addPrescriptionForm.controls[controlName].hasError(errorName);
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




  getPatientById(Id:number) {
    this.repository.getById('patients',Id).subscribe(
      (res: any) => {
      this.patientModel=res;
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
        console.log(result);
      this.prescriptionMedicines.push(result);
      this.refeshMedicineTable();
      }
    });
}

editMedicine(medicine){
   const dialogRef = this.dialog.open(PrescriptionEditMedicineDialogComponent, {
        data: { medicine, frequencys: this.frequencys, medicineTypes: this.medicineTypes },

         width: "50%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      medicine=result;
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
               const index = this.prescriptionMedicines.findIndex(f => f.id === result.id);
        this.prescriptionMedicines.splice(index, 1);
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

       const index = this.prescriptionInstructions.findIndex(f => f.id === result.id);
        this.prescriptionInstructions.splice(index, 1);
        this.refeshInstructionTable();
      }
    });
}
onSave(){

  this.dataItem.prescriptionMedicines=this.prescriptionMedicines;
  this.dataItem.prescriptionInstructions=this.prescriptionInstructions;
  console.log(this.dataItem);
    this.repository.post('prescriptions',this.dataItem).subscribe(
      (res: any) => {
          this.snackBar.open("Prescriptions is added successfully", '', {
          duration: 1000,
            panelClass: ['green-snackbar'],
            horizontalPosition: "right"
        });
this.router.navigate(['/home/patientprofile',parseInt(this.route.snapshot.paramMap.get('id'))]);

      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 10000,
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



}
