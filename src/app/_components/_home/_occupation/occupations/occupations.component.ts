import { RepositoryService } from 'src/app/_services';
import { Occupation } from 'src/app/_models';
import { OccupationEditDialogComponent } from './../occupation-edit-dialog/occupation-edit-dialog.component';
import { OccupationAddDialogComponent } from '../occupation-add-dialog/occupation-add-dialog.component';
import { OccupationDeleteDialogComponent } from '../occupation-delete-dialog/occupation-delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-occupations',
  templateUrl: './occupations.component.html',
  styleUrls: ['./occupations.component.css']
})

export class OccupationsComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'edit', 'delete'];
  occupations: Occupation[];
  dataSource = new MatTableDataSource<Occupation>();

  constructor(private repository: RepositoryService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getOccupations();
  }

  getOccupations() {
    this.repository.get('occupations').subscribe(
      (res: any) => {
        this.occupations = res;
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
    const dialogRef = this.dialog.open(OccupationAddDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.occupations.push(result);
        this.refeshData();
      }
    });
  }

  edit(occupation) {
    const dialogRef = this.dialog.open(OccupationEditDialogComponent, {
      data: occupation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.occupations.findIndex(f => f.id === result.id);
        this.occupations[index] = result;
        this.refeshData();
      }
    });
  }

  delete(occupation) {
    const dialogRef = this.dialog.open(OccupationDeleteDialogComponent, {
      data: occupation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.occupations.findIndex(f => f.id === result.id);
        this.occupations.splice(index, 1);
        this.refeshData();
      }
    });
  }

  refeshData() {
    this.dataSource = new MatTableDataSource(this.occupations);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
