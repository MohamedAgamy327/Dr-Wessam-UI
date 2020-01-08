import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { RepositoryService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Medicine, MedicineType, Frequency } from 'src/app/_models';
import { PrescriptionAddMedicineDialogComponent } from './prescription-add-medicine-dialog/prescription-add-medicine-dialog.component';
import { PrescriptionAddInstructionDialogComponent } from './prescription-add-instruction-dialog/prescription-add-instruction-dialog.component';

import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Patient, Occupation, Knowing } from 'src/app/_models';
@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
patientModel:any;
addPrescriptionForm:FormGroup;
prescriptionMedicines:any[];
prescriptionInstructions:any[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['medcinename', 'type', 'frequency', 'duration',  'actions'];
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
          diagonsis:["",Validators.required],
          visitDate:["",Validators.required],
          nextVisitDate:["",Validators.required],
          visitType:["",Validators.required],

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
      console.log( this.prescriptionMedicines);

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



}
