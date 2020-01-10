import { RepositoryService } from 'src/app/_services';
import { Knowing } from 'src/app/_models';
import { KnowingEditDialogComponent } from './../knowing-edit-dialog/knowing-edit-dialog.component';
import { KnowingAddDialogComponent } from '../knowing-add-dialog/knowing-add-dialog.component';
import { KnowingDeleteDialogComponent } from '../knowing-delete-dialog/knowing-delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-knowings',
  templateUrl: './knowings.component.html',
  styleUrls: ['./knowings.component.css']
})

export class KnowingsComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'edit', 'delete'];
  knowings: Knowing[];
  dataSource = new MatTableDataSource<Knowing>();

  constructor(private repository: RepositoryService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getKnowings();
  }

  getKnowings() {
    this.repository.get('knowings').subscribe(
      (res: any) => {
        this.knowings = res;
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
    const dialogRef = this.dialog.open(KnowingAddDialogComponent, {
         width: "30%",
      height: "auto",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.knowings.push(result);
        this.refeshData();
      }
    });
  }

  edit(knowing) {
    const dialogRef = this.dialog.open(KnowingEditDialogComponent, {
         width: "30%",
      height: "auto",
      data: knowing
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.knowings.findIndex(f => f.id === result.id);
        this.knowings[index] = result;
        this.refeshData();
      }
    });
  }

  delete(knowing) {
    const dialogRef = this.dialog.open(KnowingDeleteDialogComponent, {
         width: "30%",
      height: "auto",
      data: knowing
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.knowings.findIndex(f => f.id === result.id);
        this.knowings.splice(index, 1);
        this.refeshData();
      }
    });
  }

  refeshData() {
    this.dataSource = new MatTableDataSource(this.knowings);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
