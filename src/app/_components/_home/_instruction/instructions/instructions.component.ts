import { RepositoryService } from 'src/app/_services';
import { Instruction } from 'src/app/_models';
import { InstructionEditDialogComponent } from './../instruction-edit-dialog/instruction-edit-dialog.component';
import { InstructionAddDialogComponent } from '../instruction-add-dialog/instruction-add-dialog.component';
import { InstructionDeleteDialogComponent } from '../instruction-delete-dialog/instruction-delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})

export class InstructionsComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['englishName', 'arabicName', 'edit', 'delete'];
  instructions: Instruction[];
  dataSource = new MatTableDataSource<Instruction>();
  

  constructor(private repository: RepositoryService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getInstructions();
  }

  getInstructions() {
    this.repository.get('instructions').subscribe(
      (res: any) => {
        this.instructions = res;
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
    const dialogRef = this.dialog.open(InstructionAddDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.instructions.push(result);
        this.refeshData();
      }
    });
  }

  edit(instruction) {
    const dialogRef = this.dialog.open(InstructionEditDialogComponent, {
      data: instruction
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.instructions.findIndex(f => f.id === result.id);
        this.instructions[index] = result;
        this.refeshData();
      }
    });
  }

  delete(instruction) {
    const dialogRef = this.dialog.open(InstructionDeleteDialogComponent, {
      data: instruction
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.instructions.findIndex(f => f.id === result.id);
        this.instructions.splice(index, 1);
        this.refeshData();
      }
    });
  }

  refeshData() {
    this.dataSource = new MatTableDataSource(this.instructions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
