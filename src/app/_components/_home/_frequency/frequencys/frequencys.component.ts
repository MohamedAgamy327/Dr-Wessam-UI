import { RepositoryService } from 'src/app/_services';
import { Frequency } from 'src/app/_models';
import { FrequencyEditDialogComponent } from './../frequency-edit-dialog/frequency-edit-dialog.component';
import { FrequencyAddDialogComponent } from '../frequency-add-dialog/frequency-add-dialog.component';
import { FrequencyDeleteDialogComponent } from '../frequency-delete-dialog/frequency-delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-frequencys',
  templateUrl: './frequencys.component.html',
  styleUrls: ['./frequencys.component.css']
})

export class FrequencysComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['englishName', 'arabicName', 'edit', 'delete'];
  frequencys: Frequency[];
  dataSource = new MatTableDataSource<Frequency>();

  constructor(private repository: RepositoryService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getFrequencys();
  }

  getFrequencys() {
    this.repository.get('frequencys').subscribe(
      (res: any) => {
        this.frequencys = res;
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
    const dialogRef = this.dialog.open(FrequencyAddDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.frequencys.push(result);
        this.refeshData();
      }
    });
  }

  edit(frequency) {
    const dialogRef = this.dialog.open(FrequencyEditDialogComponent, {
      data: frequency
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.frequencys.findIndex(f => f.id === result.id);
        this.frequencys[index] = result;
        this.refeshData();
      }
    });
  }

  delete(frequency) {
    const dialogRef = this.dialog.open(FrequencyDeleteDialogComponent, {
      data: frequency
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.frequencys.findIndex(f => f.id === result.id);
        this.frequencys.splice(index, 1);
        this.refeshData();
      }
    });
  }

  refeshData() {
    this.dataSource = new MatTableDataSource(this.frequencys);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
