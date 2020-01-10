import { RepositoryService } from 'src/app/_services';
import { Medicine, MedicineType, Frequency } from 'src/app/_models';
import { MedicineEditDialogComponent } from './../medicine-edit-dialog/medicine-edit-dialog.component';
import { MedicineAddDialogComponent } from '../medicine-add-dialog/medicine-add-dialog.component';
import { MedicineDeleteDialogComponent } from '../medicine-delete-dialog/medicine-delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})

export class MedicinesComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'type', 'frequency', 'duration', 'notes', 'edit', 'delete'];
  medicines: Medicine[];
  medicineTypes: MedicineType[];
  frequencys: Frequency[];
  dataSource = new MatTableDataSource<Medicine>();

  constructor(private repository: RepositoryService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getMedicines();
    this.getFrequencys();
    this.getMedicineTypes();
  }

  getMedicines() {
    this.repository.get('medicines').subscribe(
      (res: any) => {
        this.medicines = res;
        this.refeshData();
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add() {
    const dialogRef = this.dialog.open(MedicineAddDialogComponent, {
         width: "30%",
      height: "auto",
      data: { frequencys: this.frequencys, medicineTypes: this.medicineTypes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medicines.push(result);
        this.refeshData();
      }
    });
  }

  edit(medicine) {
    const dialogRef = this.dialog.open(MedicineEditDialogComponent, {
         width: "30%",
      height: "auto",
      data: { medicine, frequencys: this.frequencys, medicineTypes: this.medicineTypes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.medicines.findIndex(f => f.id === result.id);
        this.medicines[index] = result;
        this.refeshData();
      }
    });
  }

  delete(medicine) {
    const dialogRef = this.dialog.open(MedicineDeleteDialogComponent, {
         width: "30%",
      height: "auto",
      data: medicine
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.medicines.findIndex(f => f.id === result.id);
        this.medicines.splice(index, 1);
        this.refeshData();
      }
    });
  }


  refeshData() {
    this.dataSource = new MatTableDataSource(this.medicines);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
