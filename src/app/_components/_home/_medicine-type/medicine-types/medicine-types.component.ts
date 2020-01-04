import { RepositoryService } from 'src/app/_services';
import { MedicineType } from 'src/app/_models';
import { MedicineTypeEditDialogComponent } from './../medicine-type-edit-dialog/medicine-type-edit-dialog.component';
import { MedicineTypeAddDialogComponent } from '../medicine-type-add-dialog/medicine-type-add-dialog.component';
import { MedicineTypeDeleteDialogComponent } from '../medicine-type-delete-dialog/medicine-type-delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-medicine-types',
  templateUrl: './medicine-types.component.html',
  styleUrls: ['./medicine-types.component.css']
})

export class MedicineTypesComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'edit', 'delete'];
  medicineTypes: MedicineType[];
  dataSource = new MatTableDataSource<MedicineType>();

  constructor(private repository: RepositoryService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getMedicineTypes();
  }

  getMedicineTypes() {
    this.repository.get('medicinetypes').subscribe(
      (res: any) => {
        this.medicineTypes = res;
        this.refeshData();
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
    const dialogRef = this.dialog.open(MedicineTypeAddDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medicineTypes.push(result);
        this.refeshData();
      }
    });
  }

  edit(medicineType) {
    const dialogRef = this.dialog.open(MedicineTypeEditDialogComponent, {
      data: medicineType
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.medicineTypes.findIndex(f => f.id === result.id);
        this.medicineTypes[index] = result;
        this.refeshData();
      }
    });
  }

  delete(medicineType) {
    const dialogRef = this.dialog.open(MedicineTypeDeleteDialogComponent, {
      data: medicineType
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.medicineTypes.findIndex(f => f.id === result.id);
        this.medicineTypes.splice(index, 1);
        this.refeshData();
      }
    });
  }

  refeshData() {
    this.dataSource = new MatTableDataSource(this.medicineTypes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
