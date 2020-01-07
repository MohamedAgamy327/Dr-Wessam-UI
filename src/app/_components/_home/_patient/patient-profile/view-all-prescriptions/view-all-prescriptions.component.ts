import { RepositoryService } from 'src/app/_services';
import { Patient, Occupation, Knowing } from 'src/app/_models';

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';

import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-all-prescriptions',
  templateUrl: './view-all-prescriptions.component.html',
  styleUrls: ['./view-all-prescriptions.component.css']
})
export class ViewAllPrescriptionsComponent implements OnInit {

@Input() patientId:any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['dateofvisit', 'nextvisit', 'visittype', 'actions'];
  prescriptions: any[];

  dataSource = new MatTableDataSource<any>();

  constructor(private route:ActivatedRoute,private repository: RepositoryService,private router:Router ,private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.patientId);
   if (this.patientId!==undefined) {
     this.getPrescriptionsByPatientId(this.patientId);
   }

  }

  getPrescriptionsByPatientId(Id:number) {
    this.repository.getById('Prescriptions/patients',this.patientId).subscribe(
      (res: any) => {
        console.log(res);
this.dataSource=res;
         this.prescriptions = res;
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }

goToPrescriptionPage(){
this.router.navigate(['home/addprescription',this.patientId])
}



}
