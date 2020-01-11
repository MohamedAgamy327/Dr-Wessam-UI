import { PrescriptionDeleteDialogComponent } from './prescription-delete-dialog/prescription-delete-dialog.component';
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

goToEditPrescription(row){
this.router.navigate(['home/editprescription',row.id])
}
delete(item) {
  alert("kops")
    const dialogRef = this.dialog.open(PrescriptionDeleteDialogComponent, {
         width: "30%",
      height: "auto",
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.prescriptions.findIndex(f => f.id === result.id);
        this.prescriptions.splice(index, 1);
        this.refeshData();
      }
    });
  }

    refeshData() {
    this.dataSource = new MatTableDataSource(this.prescriptions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
