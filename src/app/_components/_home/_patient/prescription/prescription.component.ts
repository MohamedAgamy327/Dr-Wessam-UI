import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RepositoryService } from 'src/app/_services';
import { Medicine, MedicineType, Frequency } from 'src/app/_models';
import { MedicineDialogComponent } from './medicine-dialog/medicine-dialog.component';


import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Patient, Occupation, Knowing } from 'src/app/_models';
@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
patientModel:any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'type', 'frequency', 'duration', 'notes', 'edit', 'delete'];
  medicines: Medicine[];
  medicineTypes: MedicineType[];
  frequencys: Frequency[];

  dataSource = new MatTableDataSource<Medicine>();
  constructor( private route:ActivatedRoute,private repository: RepositoryService,private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
   let patientId= parseInt(this.route.snapshot.paramMap.get('id'));
   if (patientId!==undefined) {
     this.getPatientById(patientId); 
   }
      this.getFrequencys();
    this.getMedicines();
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
   const dialogRef = this.dialog.open(MedicineDialogComponent, {
      data: {
      operation:"AddMedicine" ,
      PatientId:parseInt(this.route.snapshot.paramMap.get('id'))
      },
         width: "50%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      
      
      }
    });
}


}
