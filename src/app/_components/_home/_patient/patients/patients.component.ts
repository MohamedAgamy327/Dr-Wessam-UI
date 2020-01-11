import { RepositoryService } from 'src/app/_services';
import { Patient, Occupation, Knowing } from 'src/app/_models';
import { PatientEditDialogComponent } from './../patient-edit-dialog/patient-edit-dialog.component';
import { PatientAddDialogComponent } from '../patient-add-dialog/patient-add-dialog.component';
import { PatientDeleteDialogComponent } from '../patient-delete-dialog/patient-delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { PatientShowDialogComponent } from '../patient-show-dialog/patient-show-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})

export class PatientsComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['code', 'name', 'phone1', 'show', 'edit', 'delete','prescription'];
  patients: Patient[];
  occupations: Occupation[];
  knowings: Knowing[];
  dataSource = new MatTableDataSource<Patient>();

  constructor(private repository: RepositoryService,private router:Router ,private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getPatients();
    this.getOccupations();
    this.getKnowings();
  }

  getPatients() {
    this.repository.get('patients').subscribe(
      (res: any) => {
        this.patients = res;
        this.refeshData();
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }

  getOccupations() {
    this.repository.get('occupations').subscribe(
      (res: any) => {
        this.occupations = res;
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }

  getKnowings() {
    this.repository.get('knowings').subscribe(
      (res: any) => {
        this.knowings = res;
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }

  goToPatientProfile(patient){
this.router.navigate(['/home/patientprofile',patient.id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add() {
    const dialogRef = this.dialog.open(PatientAddDialogComponent, {
         width: "30%",
      height: "auto",
      data: { occupations: this.occupations, knowings: this.knowings }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patients.push(result);
        this.refeshData();
      }
    });
  }

  edit(patient) {
    const dialogRef = this.dialog.open(PatientEditDialogComponent, {
         width: "30%",
      height: "auto",
      data: { patient, knowings: this.knowings, occupations: this.occupations }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.patients.findIndex(f => f.id === result.id);
        this.patients[index] = result;
        this.refeshData();
      }
    });
  }

  delete(patient) {
    const dialogRef = this.dialog.open(PatientDeleteDialogComponent, {
         width: "30%",
      height: "auto",
      data: patient
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.patients.findIndex(f => f.id === result.id);
        this.patients.splice(index, 1);
        this.refeshData();
      }
    });
  }

  show(patient) {
    this.dialog.open(PatientShowDialogComponent, {
         width: "30%",
      height: "auto",
      data: patient
    });
  }

  refeshData() {
    this.dataSource = new MatTableDataSource(this.patients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
