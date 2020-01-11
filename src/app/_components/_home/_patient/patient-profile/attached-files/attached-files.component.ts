import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { RepositoryService } from 'src/app/_services';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-attached-files',
  templateUrl: './attached-files.component.html',
  styleUrls: ['./attached-files.component.css']
})
export class AttachedFilesComponent implements OnInit {
patientFiles:any[];


@Input() patientId:any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['seriel', 'name', 'actions'];
patientAttachFileId:number;

  constructor(private repository: RepositoryService,private snackBar: MatSnackBar)
{
  this.patientFiles=[];

 }


  ngOnInit() {
    if (this.patientId!==undefined) {
      this.patientAttachFileId=this.patientId;
      this.getPtientFiles(this.patientId);
   }
  }
  getPtientFiles(id:any){
    this.repository.getById("PatientFiles",id).subscribe((res:any[])=>
    {


      this.patientFiles=res;
      this.refeshData();
    });
  }

  openFile(file: any) {
    let f = file[0];
    let myfile=new FormData();
    myfile.append(f.name, f);
   this.repository.uploadFile( myfile,"PatientFiles","uploadfile").subscribe(res => {


this.patientFiles.push({patientId:this.patientId,patientFilePath:f.name});

    this.refeshData();
      // this.fireSnackBar("files  Uploaded success", "X", "green-snackbar");
        });


  }

uploadAllFiles(){
  console.log(this.patientFiles);
 this.repository.post("patients",this.patientFiles).subscribe(res => {
          this.fireSnackBar("files  Uploaded success", "X", "green-snackbar");
        });
}

 refeshData() {
    this.dataSource = new MatTableDataSource(this.patientFiles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fireSnackBar(message: string, action, classType: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [classType],
      horizontalPosition: "right"
    });
  }


  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
