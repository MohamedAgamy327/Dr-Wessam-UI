import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { RepositoryService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
patientModel:any;
patientId:number;
  constructor( private route:ActivatedRoute,public router: Router,private repository: RepositoryService,private formBuilder: FormBuilder,
  private snackBar: MatSnackBar, private dialog: MatDialog)
  {}
  ngOnInit() {
this.patientId= parseInt(this.route.snapshot.paramMap.get('id'));
   if (this.patientId!==undefined) {
     this.getPatientById(this.patientId);
   }
  }
getPatientById(Id:number) {
    this.repository.getById('patients',Id).subscribe(
      (res: any) => {
      this.patientModel=res;
      },
      (err: any) => {
        this.snackBar.open(err.error, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      });
  }
// navigations

goToPrescriptions(){

   this.router.navigate(['home/patientprofile'])
}
goToinfertilitySheet(){

   this.router.navigate(['home/patientprofile/infertilitysheet'])
}
goToPregnancySequence(){

   this.router.navigate(['home/patientprofile/pregnancysequence'])
}
goToAttachFiles(){

   this.router.navigate(['home/patientprofile/attachfiles'])
}

}
